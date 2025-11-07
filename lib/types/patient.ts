/**
 * Patient type definitions
 * Based on Prisma schema
 */

import type { User } from "./user";

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date | null;
  address: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface PatientWithRelations extends Patient {
  appointments?: Array<{
    id: string;
    appointmentDate: Date;
    appointmentTime: string;
    status: string;
    serviceId: string;
  }>;
  user?: Pick<User, "id" | "name" | "email">;
}

export interface PatientFormData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: Date | null;
  address?: string;
  notes?: string;
}

export interface PatientCreateInput extends PatientFormData {
  userId: string;
}

export interface PatientUpdateInput {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date | null;
  address?: string;
  notes?: string;
}

// Utility types
export type PatientListItem = Omit<
  Patient,
  "notes" | "createdAt" | "updatedAt"
>;

export interface PatientFilters {
  search?: string;
  userId?: string;
}

export interface PatientStats {
  total: number;
  withUpcomingAppointments: number;
  newThisMonth: number;
}
