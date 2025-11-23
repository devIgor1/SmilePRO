"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import dayjs from "dayjs";

interface CreatePublicBookingInput {
  clinicId: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: Date | null;
  serviceId: string;
  appointmentDate: Date;
  appointmentTime: string;
  notes?: string | null;
}

export async function createPublicBooking(data: CreatePublicBookingInput) {
  try {
    // Verify clinic exists and is active
    const clinic = await prisma.user.findUnique({
      where: {
        id: data.clinicId,
        status: true,
      },
      select: {
        id: true,
        timeslots: true,
      },
    });

    if (!clinic) {
      throw new Error("Clinic not found or inactive");
    }

    // Verify service exists and belongs to clinic
    const service = await prisma.service.findUnique({
      where: {
        id: data.serviceId,
        userId: data.clinicId,
        isActive: true,
      },
    });

    if (!service) {
      throw new Error("Service not found or inactive");
    }

    // Verify time slot is valid
    if (!clinic.timeslots.includes(data.appointmentTime)) {
      throw new Error("Invalid time slot");
    }

    // Check if time slot is available
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        userId: data.clinicId,
        appointmentDate: {
          gte: dayjs(data.appointmentDate).startOf("day").toDate(),
          lt: dayjs(data.appointmentDate).add(1, "day").startOf("day").toDate(),
        },
        appointmentTime: data.appointmentTime,
      },
    });

    if (existingAppointment) {
      throw new Error("This time slot is no longer available");
    }

    // Find or create patient
    let patient = await prisma.patient.findFirst({
      where: {
        email: data.email,
        userId: data.clinicId,
      },
    });

    if (patient) {
      // Update existing patient info if needed
      patient = await prisma.patient.update({
        where: { id: patient.id },
        data: {
          name: data.name,
          phone: data.phone,
          dateOfBirth: data.dateOfBirth,
        },
      });
    } else {
      // Create new patient
      patient = await prisma.patient.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          dateOfBirth: data.dateOfBirth,
          userId: data.clinicId,
        },
      });
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        notes: data.notes,
        status: "PENDING",
        patientId: patient.id,
        serviceId: data.serviceId,
        userId: data.clinicId,
      },
      include: {
        service: true,
        patient: true,
      },
    });

    revalidatePath(`/clinic/${data.clinicId}`);
    revalidatePath("/dashboard/appointments");

    return {
      success: true,
      appointment,
      message: "Appointment booked successfully! You will receive a confirmation email shortly.",
    };
  } catch (error) {
    console.error("Error creating public booking:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to book appointment"
    );
  }
}

