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
    
    // Get language from localStorage (works for both logged and non-logged users)
    if (typeof window !== "undefined") {
      const lang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
      if (lang && (lang === "en" || lang === "pt-BR")) {
        setStoredLanguage(lang);
      }
    }

    // Listen for language change events
    const handleLanguageChange = (event: CustomEvent<Language>) => {
      setStoredLanguage(event.detail);
    };

    window.addEventListener("languageChanged", handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange as EventListener);
    };
  }, []);
  
  useEffect(() => {
    if (!isClient) return;
    
    // Sync with localStorage when session changes
    if (typeof window !== "undefined") {
      const lang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
      if (lang && (lang === "en" || lang === "pt-BR")) {
        setStoredLanguage(lang);
      }
    }
  }, [session?.user?.systemLanguage, isClient]);
  
  const language = useMemo(() => {
    if (session?.user) {
      // For logged users, prefer session language but fallback to localStorage
      const userLanguage = (session.user.systemLanguage || storedLanguage || "en") as Language;
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

