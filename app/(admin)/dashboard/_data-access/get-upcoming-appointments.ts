"use server";

import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import { AppointmentStatus } from "@/lib/generated/prisma/enums";

export async function getUpcomingAppointments(userId: string, limit = 5) {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const now = new Date();
    const startOfToday = dayjs(now).startOf("day").toDate();

    const appointments = await prisma.appointment.findMany({
      where: {
        userId,
        appointmentDate: {
          gte: startOfToday,
        },
        status: {
          not: AppointmentStatus.CANCELLED,
        },
      },
      include: {
        patient: true,
        service: true,
      },
      orderBy: [{ appointmentDate: "asc" }, { appointmentTime: "asc" }],
      take: limit,
    });

    return appointments;
  } catch (error) {
    console.error("Error fetching upcoming appointments:", error);
    throw new Error("Failed to get upcoming appointments");
  }
}
