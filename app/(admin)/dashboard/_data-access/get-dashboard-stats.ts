"use server";

import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import { AppointmentStatus } from "@/lib/generated/prisma/enums";

export interface DashboardStats {
  totalPatients: number;
  activePatients: number;
  newPatientsThisMonth: number;
  newPatientsLastMonth: number;
  totalAppointments: number;
  avgVisitsPerPatient: number;
  totalRevenue: number;
  monthlyRevenue: number;
  todayAppointments: number;
  upcomingAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  totalServices: number;
}

export interface MonthlyRevenueData {
  month: string;
  revenue: number;
  appointments: number;
}

export interface AppointmentStatusData {
  status: string;
  count: number;
}

export async function getDashboardStats(
  userId: string
): Promise<DashboardStats> {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const now = new Date();
    const startOfToday = dayjs(now).startOf("day").toDate();
    const endOfToday = dayjs(now).endOf("day").toDate();
    const startOfThisMonth = dayjs(now).startOf("month").toDate();
    const endOfThisMonth = dayjs(now).endOf("month").toDate();
    const startOfLastMonth = dayjs(now)
      .subtract(1, "month")
      .startOf("month")
      .toDate();
    const endOfLastMonth = dayjs(now)
      .subtract(1, "month")
      .endOf("month")
      .toDate();

    // Get all counts in parallel
    const [
      totalPatients,
      patientsThisMonth,
      patientsLastMonth,
      allPatients,
      allAppointments,
      todayAppointments,
      upcomingAppointments,
      pendingAppointments,
      completedAppointments,
      totalServices,
      monthlyAppointments,
    ] = await Promise.all([
      // Total patients
      prisma.patient.count({
        where: { userId },
      }),
      // Patients created this month
      prisma.patient.count({
        where: {
          userId,
          createdAt: {
            gte: startOfThisMonth,
            lte: endOfThisMonth,
          },
        },
      }),
      // Patients created last month
      prisma.patient.count({
        where: {
          userId,
          createdAt: {
            gte: startOfLastMonth,
            lte: endOfLastMonth,
          },
        },
      }),
      // All patients with appointments for active calculation
      prisma.patient.findMany({
        where: { userId },
        include: {
          appointments: {
            where: {
              status: {
                not: AppointmentStatus.CANCELLED,
              },
            },
          },
        },
      }),
      // All appointments for average calculation
      prisma.appointment.findMany({
        where: {
          userId,
          status: {
            not: AppointmentStatus.CANCELLED,
          },
        },
        include: {
          service: true,
        },
      }),
      // Today's appointments
      prisma.appointment.count({
        where: {
          userId,
          appointmentDate: {
            gte: startOfToday,
            lte: endOfToday,
          },
          status: {
            not: AppointmentStatus.CANCELLED,
          },
        },
      }),
      // Upcoming appointments
      prisma.appointment.count({
        where: {
          userId,
          appointmentDate: {
            gt: endOfToday,
          },
          status: {
            not: AppointmentStatus.CANCELLED,
          },
        },
      }),
      // Pending appointments
      prisma.appointment.count({
        where: {
          userId,
          status: AppointmentStatus.PENDING,
        },
      }),
      // Completed appointments
      prisma.appointment.count({
        where: {
          userId,
          status: AppointmentStatus.COMPLETED,
        },
      }),
      // Total services
      prisma.service.count({
        where: { userId, isActive: true },
      }),
      // Monthly appointments for revenue
      prisma.appointment.findMany({
        where: {
          userId,
          appointmentDate: {
            gte: startOfThisMonth,
            lte: endOfThisMonth,
          },
          status: {
            not: AppointmentStatus.CANCELLED,
          },
        },
        include: {
          service: true,
        },
      }),
    ]);

    // Calculate active patients (patients with at least one non-cancelled appointment)
    const activePatients = allPatients.filter(
      (patient) => patient.appointments.length > 0
    ).length;

    // Calculate average visits per patient
    const avgVisitsPerPatient =
      totalPatients > 0
        ? Math.round((allAppointments.length / totalPatients) * 10) / 10
        : 0;

    // Calculate revenue
    const totalRevenue = allAppointments.reduce(
      (sum, apt) => sum + (apt.service?.price || 0),
      0
    );

    const monthlyRevenue = monthlyAppointments.reduce(
      (sum, apt) => sum + (apt.service?.price || 0),
      0
    );

    return {
      totalPatients,
      activePatients,
      newPatientsThisMonth: patientsThisMonth,
      newPatientsLastMonth: patientsLastMonth,
      totalAppointments: allAppointments.length,
      avgVisitsPerPatient,
      totalRevenue,
      monthlyRevenue,
      todayAppointments,
      upcomingAppointments,
      pendingAppointments,
      completedAppointments,
      totalServices,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new Error("Failed to get dashboard statistics");
  }
}

export async function getMonthlyRevenueData(
  userId: string
): Promise<MonthlyRevenueData[]> {
  try {
    const now = dayjs();
    const months = [];

    // Get last 6 months
    for (let i = 5; i >= 0; i--) {
      const monthStart = now.subtract(i, "month").startOf("month").toDate();
      const monthEnd = now.subtract(i, "month").endOf("month").toDate();

      const appointments = await prisma.appointment.findMany({
        where: {
          userId,
          appointmentDate: {
            gte: monthStart,
            lte: monthEnd,
          },
          status: {
            not: AppointmentStatus.CANCELLED,
          },
        },
        include: {
          service: true,
        },
      });

      const revenue = appointments.reduce(
        (sum, apt) => sum + (apt.service?.price || 0),
        0
      );

      months.push({
        month: now.subtract(i, "month").format("MMM"),
        revenue: revenue / 100, // Convert cents to dollars
        appointments: appointments.length,
      });
    }

    return months;
  } catch (error) {
    console.error("Error fetching monthly revenue data:", error);
    return [];
  }
}

export async function getAppointmentStatusData(
  userId: string
): Promise<AppointmentStatusData[]> {
  try {
    const statusCounts = await prisma.appointment.groupBy({
      by: ["status"],
      where: {
        userId,
      },
      _count: {
        id: true,
      },
    });

    return statusCounts.map((item) => ({
      status: item.status,
      count: item._count.id,
    }));
  } catch (error) {
    console.error("Error fetching appointment status data:", error);
    return [];
  }
}
