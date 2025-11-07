import dayjs from "dayjs";
import type { PatientWithRelations } from "@/lib/types";

/**
 * Calculate patient age from date of birth
 */
export function calculateAge(dateOfBirth: Date | null): string {
  if (!dateOfBirth) return "N/A";
  const years = dayjs().diff(dayjs(dateOfBirth), "year");
  return `${years} years`;
}

/**
 * Get initials from patient name for avatar
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Determine if patient is active (has appointment in last 6 months)
 */
export function isPatientActive(patient: PatientWithRelations): boolean {
  if (!patient.appointments || patient.appointments.length === 0) return false;
  
  const lastAppointment = patient.appointments[0];
  const sixMonthsAgo = dayjs().subtract(6, "months");
  return dayjs(lastAppointment.appointmentDate).isAfter(sixMonthsAgo);
}

/**
 * Get patient's next scheduled appointment
 */
export function getNextAppointment(patient: PatientWithRelations) {
  if (!patient.appointments || patient.appointments.length === 0) return null;

  const futureAppointments = patient.appointments.filter((apt) =>
    dayjs(apt.appointmentDate).isAfter(dayjs())
  );

  if (futureAppointments.length === 0) return null;

  return futureAppointments.sort((a, b) =>
    dayjs(a.appointmentDate).diff(dayjs(b.appointmentDate))
  )[0];
}

/**
 * Get patient's last completed visit
 */
export function getLastVisit(patient: PatientWithRelations) {
  if (!patient.appointments || patient.appointments.length === 0) return null;

  const pastAppointments = patient.appointments.filter(
    (apt) =>
      dayjs(apt.appointmentDate).isBefore(dayjs()) && apt.status === "COMPLETED"
  );

  if (pastAppointments.length === 0) return null;

  return pastAppointments.sort((a, b) =>
    dayjs(b.appointmentDate).diff(dayjs(a.appointmentDate))
  )[0];
}

