import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import type { Language } from "@/lib/i18n/translations";

/**
 * Format date based on language
 * @param date - Date to format
 * @param language - Language code ("en" | "pt-BR")
 * @param format - Format type: "full" (with year), "short" (without year), or "numeric" (DD/MM/YYYY)
 * @returns Formatted date string
 */
export function formatDateByLanguage(
  date: Date | string,
  language: Language = "en",
  format: "full" | "short" | "numeric" = "full"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  if (language === "pt-BR") {
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
  } else {
    dayjs.locale("en");
    
    switch (format) {
      case "full":
        return dayjs(dateObj).format("MMMM D, YYYY");
      case "short":
        return dayjs(dateObj).format("MMMM D");
      case "numeric":
        return dayjs(dateObj).format("MM/DD/YYYY");
      default:
        return dayjs(dateObj).format("MMMM D, YYYY");
    }
  }
}

/**
 * Format date for month and year only
 * @param date - Date to format
 * @param language - Language code ("en" | "pt-BR")
 * @returns Formatted date string (e.g., "December 2025" or "dezembro de 2025")
 */
export function formatMonthYear(
  date: Date | string,
  language: Language = "en"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  if (language === "pt-BR") {
    dayjs.locale("pt-br");
    return dayjs(dateObj).format("MMMM [de] YYYY");
  } else {
    dayjs.locale("en");
    return dayjs(dateObj).format("MMMM YYYY");
  }
}

