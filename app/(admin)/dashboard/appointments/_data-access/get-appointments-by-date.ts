"use server";

import prisma from "@/lib/prisma";
import dayjs from "dayjs";

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

    // Get start and end of the selected date using dayjs
    const startOfDay = dayjs(date).startOf("day").toDate();
    const endOfDay = dayjs(date).endOf("day").toDate();

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
