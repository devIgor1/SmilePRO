"use client";

import { useSession } from "next-auth/react";
import { translations, type Language, type Translations } from "@/lib/i18n/translations";
import { useMemo, useEffect, useState } from "react";

const LANGUAGE_STORAGE_KEY = "smilepro-language";

export function useTranslations(): Translations {
  const { data: session } = useSession();
  const [storedLanguage, setStoredLanguage] = useState<Language>("en");
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    // Get language from localStorage for non-logged users
    if (!session?.user && typeof window !== "undefined") {
      const lang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
      if (lang && (lang === "en" || lang === "pt-BR")) {
        setStoredLanguage(lang);
      }
    }
  }, [session?.user]);
  
  const language = useMemo(() => {
    if (session?.user) {
      // Get language from session user, default to "en"
      const userLanguage = (session.user.systemLanguage || "en") as Language;
      return userLanguage === "pt-BR" ? "pt-BR" : "en";
    } else if (isClient) {
      // For non-logged users, use localStorage
      return storedLanguage;
    } else {
      // Default during SSR
      return "en";
    }
  }, [session?.user?.systemLanguage, storedLanguage, isClient]);
  
  return { ...translations[language], __language: language };
}

