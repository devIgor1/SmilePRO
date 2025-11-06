/**
 * Service type definitions
 * Based on Prisma schema
 */

import type { User } from "./user";

export interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number; // Price in cents
  duration: number; // Duration in minutes
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface ServiceWithRelations extends Service {
  appointments?: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    appointmentDate: Date;
    appointmentTime: string;
    status: string;
  }>;
  user?: Pick<User, "id" | "name" | "email">;
}

export interface ServiceFormData {
  name: string;
  description?: string;
  price: number;
  duration: number;
}

export interface ServiceCreateInput extends ServiceFormData {
  userId: string;
}

export interface ServiceUpdateInput {
  id: string;
  name?: string;
  description?: string | null;
  price?: number;
  duration?: number;
  isActive?: boolean;
}

// Re-export for convenience
export type { Service as ServiceType };

// Utility type for service list items (without relations)
export type ServiceListItem = Omit<Service, "createdAt" | "updatedAt">;
