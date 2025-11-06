import { Check, AlertCircle, X } from "lucide-react";

export function getStatusVariant(
  status: string
): "default" | "secondary" | "destructive" {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "default";
    case "pending":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
}

export function getStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case "confirmed":
      return <Check className="mr-1 h-3 w-3" />;
    case "pending":
      return <AlertCircle className="mr-1 h-3 w-3" />;
    case "cancelled":
      return <X className="mr-1 h-3 w-3" />;
    default:
      return null;
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
