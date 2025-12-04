import { auth } from "@/lib/auth";
import { translations, type Language, type Translations } from "./translations";

export async function getTranslations(): Promise<
  Translations & { __language: Language }
> {
  const session = await auth();

  // Get language from session user, default to "en"
  const userLanguage = session?.user?.systemLanguage || "en";
  const language: Language = userLanguage as Language;

  // Ensure language is valid, fallback to "en" if not
  const validLanguage: Language = language === "pt-BR" ? "pt-BR" : "en";

  return { ...translations[validLanguage], __language: validLanguage };
}
