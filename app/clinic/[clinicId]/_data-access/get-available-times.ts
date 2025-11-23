"use server";

import prisma from "@/lib/prisma";
import dayjs from "dayjs";

/**
 * Get available time slots for a specific date
 */
export async function getAvailableTimes(
  clinicId: string,
  date: string
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

    // Get existing appointments for this date
    const selectedDate = dayjs(date);
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        userId: clinicId,
        appointmentDate: {
          gte: selectedDate.startOf("day").toDate(),
          lt: selectedDate.add(1, "day").startOf("day").toDate(),
        },
      },
      select: {
        appointmentTime: true,
      },
    });

    const bookedTimes = existingAppointments.map((apt) => apt.appointmentTime);

    // Filter out booked times
    const availableTimes = clinic.timeslots.filter(
      (slot) => !bookedTimes.includes(slot)
    );

    return availableTimes.sort();
  } catch (error) {
    console.error("Error fetching available times:", error);
    return [];
  }
}

