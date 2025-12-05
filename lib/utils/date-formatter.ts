import dayjs from "dayjs";
import "dayjs/locale/pt-br";

/**
 * Format date in Portuguese Brazilian format
 * @param date - Date to format
 * @param format - Format type: "full" (with year), "short" (without year), or "numeric" (DD/MM/YYYY)
 * @returns Formatted date string
 */
export function formatDateByLanguage(
  date: Date | string,
  _language?: unknown,
  format: "full" | "short" | "numeric" = "full"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  dayjs.locale("pt-br");

  switch (format) {
    case "full":
      return dayjs(dateObj).format("D [de] MMMM [de] YYYY");
    case "short":
      return dayjs(dateObj).format("D [de] MMMM");
    case "numeric":
      return dayjs(dateObj).format("DD/MM/YYYY");
    default:
      return dayjs(dateObj).format("D [de] MMMM [de] YYYY");
  }
}

/**
 * Format date for month and year only in Portuguese
 * @param date - Date to format
 * @returns Formatted date string (e.g., "dezembro de 2025")
 */
export function formatMonthYear(
  date: Date | string,
  _language?: unknown
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  dayjs.locale("pt-br");
  return dayjs(dateObj).format("MMMM [de] YYYY");
}
