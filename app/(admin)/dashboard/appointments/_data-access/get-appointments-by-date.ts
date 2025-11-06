"use server";

import prisma from "@/lib/prisma";

interface GetAppointmentsByDateParams {
  userId: string;
  date: Date;
}

export async function getAppointmentsByDate({
  userId,
  date,
}: GetAppointmentsByDateParams) {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Get start and end of the selected date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const appointments = await prisma.appointment.findMany({
      where: {
        userId,
        appointmentDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        service: true,
      },
      orderBy: {
        appointmentTime: "asc",
      },
    });

    return appointments;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get appointments");
  }
}
