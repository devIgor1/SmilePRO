import { Check, AlertCircle, X, CheckCircle } from "lucide-react";
import { AppointmentStatus } from "@/lib/types/appointment";

export function getStatusVariant(
  status: string
): "default" | "secondary" | "destructive" {
  const statusStr = status.toUpperCase();

  switch (statusStr) {
    case AppointmentStatus.CONFIRMED:
      return "default";
    case AppointmentStatus.PENDING:
      return "secondary";
    case AppointmentStatus.CANCELLED:
      return "destructive";
    case AppointmentStatus.COMPLETED:
      return "default";
    default:
      return "secondary";
  }
}

export function getStatusIcon(status: string) {
  const statusStr = status.toUpperCase();

  switch (statusStr) {
    case AppointmentStatus.CONFIRMED:
      return <Check className="mr-1 h-3 w-3" />;
    case AppointmentStatus.PENDING:
      return <AlertCircle className="mr-1 h-3 w-3" />;
    case AppointmentStatus.CANCELLED:
      return <X className="mr-1 h-3 w-3" />;
    case AppointmentStatus.COMPLETED:
      return <CheckCircle className="mr-1 h-3 w-3" />;
    default:
      return null;
  }
}

export function getStatusLabel(status: string): string {
  const statusStr = status.toUpperCase();

  switch (statusStr) {
    case AppointmentStatus.CONFIRMED:
      return "Confirmed";
    case AppointmentStatus.PENDING:
      return "Pending";
    case AppointmentStatus.CANCELLED:
      return "Cancelled";
    case AppointmentStatus.COMPLETED:
      return "Completed";
    default:
      return statusStr;
  }
}

/**
 * Formats a time string to display format
 * @param time - Time string in HH:MM format
 * @returns Formatted time string
 */
export function formatAppointmentTime(time: string): string {
  return time;
}

/**
 * Calculates the end time of an appointment based on duration
 * @param startTime - Start time in HH:MM format
 * @param durationMinutes - Duration in minutes
 * @returns End time in HH:MM format
 */
export function calculateEndTime(
  startTime: string,
  durationMinutes: number
): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
}
