/**
 * Timezone configuration organized by UTC offset
 * Currently focused on Brazil, structured for easy expansion
 */

export const TIMEZONES_BY_UTC = {
  "-5": [
    // UTC-5: Acre Time
    { value: "America/Rio_Branco", label: "Rio Branco (UTC-5)" },
  ],
  "-4": [
    // UTC-4: Amazon Time
    { value: "America/Manaus", label: "Manaus (UTC-4)" },
    { value: "America/Boa_Vista", label: "Boa Vista (UTC-4)" },
    { value: "America/Porto_Velho", label: "Porto Velho (UTC-4)" },
  ],
  "-3": [
    // UTC-3: Brasília Time (Most of Brazil)
    { value: "America/Sao_Paulo", label: "São Paulo (UTC-3)" },
    { value: "America/Fortaleza", label: "Fortaleza (UTC-3)" },
    { value: "America/Recife", label: "Recife (UTC-3)" },
    { value: "America/Campo_Grande", label: "Campo Grande (UTC-3)" },
    { value: "America/Cuiaba", label: "Cuiabá (UTC-3)" },
    { value: "America/Araguaina", label: "Araguaína (UTC-3)" },
    { value: "America/Belem", label: "Belém (UTC-3)" },
    { value: "America/Maceio", label: "Maceió (UTC-3)" },
    { value: "America/Santarem", label: "Santarém (UTC-3)" },
    { value: "America/Bahia", label: "Bahia (UTC-3)" },
  ],
  "-2": [
    // UTC-2: Fernando de Noronha Time
    { value: "America/Noronha", label: "Fernando de Noronha (UTC-2)" },
  ],
  // Future UTC offsets can be added here:
  // "+0": [...],
  // "+1": [...],
} as const;

/**
 * Get all timezones as a flat array (currently Brazil only)
 */
export function getTimezones() {
  return Object.values(TIMEZONES_BY_UTC).flat();
}

/**
 * Get timezone options for select components
 * Returns flat array with all timezones
 */
export function getTimezoneOptions() {
  return getTimezones().map((tz) => ({
    value: tz.value,
    label: tz.label,
  }));
}
