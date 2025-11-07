/**
 * Appointment type definitions
 * Based on Prisma schema
 */

import type { Service } from "./service";
import type { User } from "./user";
import type { Patient } from "./patient";
import { AppointmentStatus } from "@/lib/generated/prisma/enums";

// Re-export the Prisma-generated enum
export { AppointmentStatus };

export interface Appointment {
  id: string;
  appointmentDate: Date;
  appointmentTime: string; // HH:MM format
  status: AppointmentStatus;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  patientId: string;
  serviceId: string;
  userId: string;
  patient?: Patient;
  service?: Service;
}

export interface AppointmentWithPatient extends Appointment {
  patient: Patient;
}

export interface AppointmentWithService extends Appointment {
  service: Service;
}

export interface AppointmentWithRelations extends Appointment {
  patient: Patient;
  service: Service;
  user?: Pick<User, "id" | "name" | "email" | "phone">;
}

export interface AppointmentFormData {
  patientId: string;
  appointmentDate: Date;
  appointmentTime: string;
  serviceId: string;
  notes?: string;
}

export interface AppointmentCreateInput extends AppointmentFormData {
  userId: string;
  status?: AppointmentStatus;
}

export interface AppointmentUpdateInput {
  id: string;
  patientId?: string;
  appointmentDate?: Date;
  appointmentTime?: string;
  status?: AppointmentStatus;
  serviceId?: string;
  notes?: string;
}

// Utility types
export type AppointmentListItem = AppointmentWithRelations;

export interface AppointmentFilters {
  date?: Date;
  status?: AppointmentStatus;
  serviceId?: string;
}

export interface AppointmentStats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  completed: number;
}
