"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdatePatientInput {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: Date | null;
  address?: string | null;
  notes?: string | null;
}

export async function updatePatient(data: UpdatePatientInput) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Verify patient belongs to user
    const existingPatient = await prisma.patient.findUnique({
      where: { id: data.id },
      select: { userId: true },
    });

    if (!existingPatient || existingPatient.userId !== userId) {
      throw new Error("Patient not found or unauthorized");
    }

    // Update patient
    const patient = await prisma.patient.update({
      where: { id: data.id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        notes: data.notes,
      },
    });

    revalidatePath("/dashboard/patients");

    return { success: true, patient };
  } catch (error) {
    console.error("Error updating patient:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update patient"
    );
  }
}
