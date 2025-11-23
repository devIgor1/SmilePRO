"use server";

import prisma from "@/lib/prisma";
import dayjs from "dayjs";

/**
 * Get dates that have available appointment slots
 * Returns next 30 days with availability
 */
export async function getAvailableDates(
  clinicId: string,
  serviceId: string
): Promise<string[]> {
  try {
    // Get clinic timeslots
    const clinic = await prisma.user.findUnique({
      where: { id: clinicId },
      select: { timeslots: true },
    });

    if (!clinic || !clinic.timeslots || clinic.timeslots.length === 0) {
      return [];
    }

    // Get service duration
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      select: { duration: true },
    });

    if (!service) {
      return [];
    }

    const availableDates: string[] = [];
    const today = dayjs().startOf("day");

    // Check next 30 days
    for (let i = 0; i < 30; i++) {
      const date = today.add(i, "day");
      const dateStr = date.format("YYYY-MM-DD");

      // Get existing appointments for this date
      const existingAppointments = await prisma.appointment.findMany({
        where: {
          userId: clinicId,
          appointmentDate: {
            gte: date.toDate(),
            lt: date.add(1, "day").toDate(),
          },
        },
        select: {
          appointmentTime: true,
        },
      });

      const bookedTimes = existingAppointments.map((apt) => apt.appointmentTime);

      // Check if there are available slots
      const hasAvailableSlot = clinic.timeslots.some(
        (slot) => !bookedTimes.includes(slot)
      );

      if (hasAvailableSlot) {
        availableDates.push(dateStr);
      }
    }

    return availableDates;
  } catch (error) {
    console.error("Error fetching available dates:", error);
    return [];
  }
}

