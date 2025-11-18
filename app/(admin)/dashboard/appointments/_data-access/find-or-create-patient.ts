"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface FindOrCreatePatientParams {
  name: string;
  email: string;
  phone: string;
  userId: string;
}

export async function findOrCreatePatient(data: FindOrCreatePatientParams) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (session.user.id !== data.userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Try to find existing patient by email
    let patient = await prisma.patient.findUnique({
      where: {
        email: data.email,
      },
    });

    // If patient doesn't exist, create a new one
    if (!patient) {
      patient = await prisma.patient.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          userId: data.userId,
        },
      });
    } else {
      // Update patient info if it exists but belongs to the same user
      if (patient.userId === data.userId) {
        patient = await prisma.patient.update({
          where: { id: patient.id },
          data: {
            name: data.name,
            phone: data.phone,
          },
        });
      } else {
        throw new Error("Patient with this email already exists for another user");
      }
    }

    return { success: true, patient };
  } catch (error) {
    console.error("Error finding or creating patient:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to find or create patient"
    );
  }
}

