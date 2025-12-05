"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { AppointmentUpdateInput } from "@/lib/types/appointment";

interface UpdateAppointmentParams extends AppointmentUpdateInput {
  userId: string;
}

export async function updateAppointment(data: UpdateAppointmentParams) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (session.user.id !== data.userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify appointment belongs to the user
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        id: data.id,
        userId: data.userId,
      },
    });

    if (!existingAppointment) {
      throw new Error("Appointment not found");
    }

    // If updating date/time, check for conflicts (excluding the current appointment)
    if (data.appointmentDate || data.appointmentTime) {
      const appointmentDate =
        data.appointmentDate || existingAppointment.appointmentDate;
      const appointmentTime =
        data.appointmentTime || existingAppointment.appointmentTime;

      const conflictingAppointment = await prisma.appointment.findFirst({
        where: {
          userId: data.userId,
          appointmentDate,
          appointmentTime,
          status: {
            not: "CANCELLED",
          },
          id: {
            not: data.id,
          },
        },
      });

      if (conflictingAppointment) {
        throw new Error("Time slot is already booked");
      }
    }

    // If updating patient, verify it belongs to the user
    if (data.patientId) {
      const patient = await prisma.patient.findFirst({
        where: {
          id: data.patientId,
          userId: data.userId,
        },
      });

      if (!patient) {
        throw new Error("Patient not found");
      }
    }

    // If updating service, verify it belongs to the user
    if (data.serviceId) {
      const service = await prisma.service.findFirst({
        where: {
          id: data.serviceId,
          userId: data.userId,
        },
      });

      if (!service) {
        throw new Error("Service not found");
      }
    }

    const updateData: {
      patientId?: string;
      appointmentDate?: Date;
      appointmentTime?: string;
      status?: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
      serviceId?: string;
      notes?: string | null;
    } = {};

    if (data.patientId) updateData.patientId = data.patientId;
    if (data.appointmentDate) updateData.appointmentDate = data.appointmentDate;
    if (data.appointmentTime) updateData.appointmentTime = data.appointmentTime;
    if (data.status) updateData.status = data.status;
    if (data.serviceId) updateData.serviceId = data.serviceId;
    if (data.notes !== undefined) updateData.notes = data.notes || null;

    const updatedAppointment = await prisma.appointment.update({
      where: { id: data.id },
      data: updateData as any,
      include: {
        patient: true,
        service: true,
      },
    });

    revalidatePath("/dashboard/appointments");
    return { success: true, appointment: updatedAppointment };
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update appointment"
    );
  }
}
