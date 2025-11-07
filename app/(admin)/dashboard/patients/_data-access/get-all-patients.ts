"use server";

import prisma from "@/lib/prisma";

export async function getAllPatients(userId: string) {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const patients = await prisma.patient.findMany({
      where: {
        userId,
      },
      include: {
        appointments: {
          include: {
            service: true,
          },
          orderBy: {
            appointmentDate: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return patients;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get patients");
  }
}

