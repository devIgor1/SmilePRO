/**
 * Central export file for all application types
 */

// User types
export * from "./user";

// Service types
export * from "./service";

// Appointment types
export * from "./appointment";

// Re-export commonly used types
export type { User } from "./user";

export type {
  Service,
  ServiceWithRelations,
  ServiceFormData,
  ServiceListItem,
} from "./service";

export type {
  Appointment,
  AppointmentWithService,
  AppointmentWithRelations,
  AppointmentFormData,
  AppointmentListItem,
} from "./appointment";

export { AppointmentStatus } from "./appointment";
