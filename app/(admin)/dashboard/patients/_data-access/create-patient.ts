"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreatePatientInput {
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: Date | null;
  address?: string | null;
  notes?: string | null;
}

export async function createPatient(data: CreatePatientInput) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Check if email already exists for this user
    const existingPatient = await prisma.patient.findFirst({
      where: {
        email: data.email,
        userId,
      },
    });

    if (existingPatient) {
      throw new Error("A patient with this email already exists");
    }

    // Create patient
    const patient = await prisma.patient.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        notes: data.notes,
        userId,
      },
    });

    revalidatePath("/dashboard/patients");

    return { success: true, patient };
  } catch (error) {
    console.error("Error creating patient:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to create patient"
    );
  }
}

