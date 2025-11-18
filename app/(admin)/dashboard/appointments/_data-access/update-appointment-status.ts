"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { AppointmentStatus } from "@/lib/types/appointment";

interface UpdateAppointmentStatusParams {
  id: string;
  status: AppointmentStatus;
  userId: string;
}

export async function updateAppointmentStatus(data: UpdateAppointmentStatusParams) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (session.user.id !== data.userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify appointment belongs to the user
    const appointment = await prisma.appointment.findFirst({
      where: {
        id: data.id,
        userId: data.userId,
      },
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: data.id },
      data: {
        status: data.status,
      },
      include: {
        patient: true,
        service: true,
      },
    });

    revalidatePath("/dashboard/appointments");
    return { success: true, appointment: updatedAppointment };
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update appointment status"
    );
  }
}

