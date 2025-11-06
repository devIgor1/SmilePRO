/**
 * User type definitions
 * Based on Prisma schema
 */

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  address: string | null;
  phone: string | null;
  status: boolean;
  timezone: string | null;
  timeslots: string[];
  stripe_customer_id: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithRelations extends User {
  accounts?: unknown[];
  sessions?: unknown[];
  subscription?: unknown;
  services?: unknown[];
  reminders?: unknown[];
  appointments?: unknown[];
}

// Utility type for user in session
export interface SessionUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}
