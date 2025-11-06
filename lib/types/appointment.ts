/**
 * Appointment type definitions
 * Based on Prisma schema
 */

import type { Service } from "./service";
import type { User } from "./user";
import { AppointmentStatus } from "@/lib/generated/prisma/enums";

// Re-export the Prisma-generated enum
export { AppointmentStatus };

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  appointmentDate: Date;
  appointmentTime: string; // HH:MM format
  status: AppointmentStatus;
  createdAt: Date;
  updatedAt: Date;
  serviceId: string;
  userId: string;
  service?: Service;
}

export interface AppointmentWithService extends Appointment {
  service: Service;
}

export interface AppointmentWithRelations extends AppointmentWithService {
  user?: Pick<User, "id" | "name" | "email" | "phone">;
}

export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
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
  name?: string;
  email?: string;
  phone?: string;
  appointmentDate?: Date;
  appointmentTime?: string;
  status?: AppointmentStatus;
  serviceId?: string;
}

// Utility types
export type AppointmentListItem = AppointmentWithService;

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
