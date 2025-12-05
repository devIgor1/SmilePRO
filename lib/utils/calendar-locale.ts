import dayjs from "dayjs";
import "dayjs/locale/pt-br";

/**
 * Get calendar formatters in Portuguese using dayjs
 * @returns Formatters object for react-day-picker
 */
export function getCalendarLocale() {
  dayjs.locale("pt-br");

  // Portuguese abbreviated weekday names
  const weekdaysShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return {
    formatMonthDropdown: (date: Date) => {
      return dayjs(date).format("MMM");
    },
    formatYearDropdown: (date: Date) => {
      return dayjs(date).format("YYYY");
    },
    formatWeekdayName: (date: Date) => {
      // Get day of week (0 = Sunday, 6 = Saturday)
      const dayOfWeek = date.getDay();
      return weekdaysShort[dayOfWeek];
    },
    formatCaption: (date: Date) => {
      return dayjs(date).format("MMMM YYYY");
    },
  };
}
