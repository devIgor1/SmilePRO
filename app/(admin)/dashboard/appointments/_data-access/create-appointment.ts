"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { AppointmentStatus } from "@/lib/types/appointment";

interface CreateAppointmentParams {
  patientId: string;
  serviceId: string;
  appointmentDate: Date;
  appointmentTime: string;
  notes?: string;
  userId: string;
  status?: AppointmentStatus;
}

export async function createAppointment(data: CreateAppointmentParams) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (session.user.id !== data.userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify patient belongs to the user
    const patient = await prisma.patient.findFirst({
      where: {
        id: data.patientId,
        userId: data.userId,
      },
    });

    if (!patient) {
      throw new Error("Patient not found");
    }

    // Verify service belongs to the user
    const service = await prisma.service.findFirst({
      where: {
        id: data.serviceId,
        userId: data.userId,
      },
    });

    if (!service) {
      throw new Error("Service not found");
    }

    // Check if there's already an appointment at this time
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        userId: data.userId,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        status: {
          not: AppointmentStatus.CANCELLED,
        },
      },
    });

    if (existingAppointment) {
      throw new Error("Time slot is already booked");
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId: data.patientId,
        serviceId: data.serviceId,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        notes: data.notes || null,
        status: data.status || AppointmentStatus.PENDING,
        userId: data.userId,
      },
      include: {
        patient: true,
        service: true,
      },
    });

    revalidatePath("/dashboard/appointments");
    return { success: true, appointment };
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to create appointment"
    );
  }
}

