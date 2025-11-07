"use server";

import prisma from "@/lib/prisma";
import dayjs from "dayjs";

export async function getPatientStats(userId: string) {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const startOfMonth = dayjs().startOf("month").toDate();
    const startOfLastMonth = dayjs()
      .subtract(1, "month")
      .startOf("month")
      .toDate();
    const endOfLastMonth = dayjs().subtract(1, "month").endOf("month").toDate();

    const [
      totalPatients,
      newThisMonth,
      newLastMonth,
      appointmentsWithPatients,
    ] = await Promise.all([
      prisma.patient.count({
        where: { userId },
      }),
      prisma.patient.count({
        where: {
          userId,
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),
      prisma.patient.count({
        where: {
          userId,
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth,
          },
        },
      }),
      prisma.appointment.findMany({
        where: {
          userId,
          appointmentDate: {
            gte: dayjs().subtract(6, "months").toDate(),
          },
        },
        select: {
          patientId: true,
        },
      }),
    ]);

    // Calculate active patients (patients with appointments in last 6 months)
    const uniqueActivePatients = new Set(
      appointmentsWithPatients.map((apt) => apt.patientId)
    );
    const activePatients = uniqueActivePatients.size;

    // Calculate percentage change from last month
    const percentageChange =
      newLastMonth > 0
        ? Math.round(((newThisMonth - newLastMonth) / newLastMonth) * 100)
        : newThisMonth > 0
          ? 100
          : 0;

    // Calculate average visits per patient
    const totalAppointments = appointmentsWithPatients.length;
    const avgVisits =
      activePatients > 0
        ? Number((totalAppointments / activePatients).toFixed(1))
        : 0;

    return {
      totalPatients,
      activePatients,
      activePercentage: totalPatients > 0 
        ? Math.round((activePatients / totalPatients) * 100) 
        : 0,
      newThisMonth,
      percentageChange,
      avgVisits,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get patient stats");
  }
}

