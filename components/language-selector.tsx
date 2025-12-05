"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "@/hooks/use-translations";
import { updateLanguage } from "@/app/(admin)/dashboard/_actions/update-language";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { Language } from "@/lib/i18n/translations";
import { useEffect, useState } from "react";

const languages: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "pt-BR", label: "Português" },
];

const LANGUAGE_STORAGE_KEY = "smilepro-language";

export function LanguageSelector() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Always check localStorage first as it's the source of truth
    const storedLanguage = localStorage.getItem(
      LANGUAGE_STORAGE_KEY
    ) as Language;
    if (
      storedLanguage &&
      (storedLanguage === "en" || storedLanguage === "pt-BR")
    ) {
      setCurrentLanguage(storedLanguage);
      return;
    }

    // Fallback to session for logged users
    if (session?.user) {
      const userLanguage = (session.user.systemLanguage || "en") as Language;
      const validLanguage = userLanguage === "pt-BR" ? "pt-BR" : "en";
      setCurrentLanguage(validLanguage);
    }
  }, [session?.user?.systemLanguage, session?.user, isMounted]);

  const handleLanguageChange = async (newLanguage: Language) => {
    // Save to localStorage immediately (for both logged and non-logged users)
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    setCurrentLanguage(newLanguage);

    // Dispatch custom event to notify all components immediately
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("languageChanged", { detail: newLanguage })
      );
    }

    // If user is logged in, update in database
    if (session?.user) {
      const result = await updateLanguage(newLanguage);

      if (result.success) {
        // Update the session to reflect the new language
        await update();
        // Sync localStorage with database value
        localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
      }
    }

    // Refresh the page to apply translations in server components
    // Using a delay to ensure session update completes
    setTimeout(() => {
      router.refresh();
    }, 200);
  };

  // Prevent hydration mismatch by not rendering Select until mounted
  if (!isMounted) {
    return (
      <div className="w-[160px] h-9 flex items-center gap-2 rounded-md border bg-transparent px-3 py-2">
        <Globe className="size-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">...</span>
      </div>
    );
  }

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[160px] h-9">
        <div className="flex items-center gap-2">
          <Globe className="size-4 text-muted-foreground" />
          <SelectValue>
            {languages.find((lang) => lang.value === currentLanguage)?.label}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
