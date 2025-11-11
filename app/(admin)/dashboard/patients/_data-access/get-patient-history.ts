"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getPatientHistory(patientId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Verify patient belongs to user
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      select: { userId: true },
    });

    if (!patient || patient.userId !== userId) {
      throw new Error("Patient not found or unauthorized");
    }

    // Get all appointments for the patient
    const appointments = await prisma.appointment.findMany({
      where: {
        patientId,
      },
      include: {
        service: true,
      },
      orderBy: {
        appointmentDate: "desc",
      },
    });

    return appointments;
  } catch (error) {
    console.error("Error getting patient history:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to get patient history"
    );
  }
}
