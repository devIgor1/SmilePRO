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
