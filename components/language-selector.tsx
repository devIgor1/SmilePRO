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
  { value: "pt-BR", label: "Português (Brasil)" },
];

const LANGUAGE_STORAGE_KEY = "smilepro-language";

export function LanguageSelector() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  
  useEffect(() => {
    // Get language from session (if logged in) or localStorage (if not logged in)
    if (session?.user) {
      const userLanguage = (session.user.systemLanguage || "en") as Language;
      const validLanguage = userLanguage === "pt-BR" ? "pt-BR" : "en";
      setCurrentLanguage(validLanguage);
    } else {
      // For non-logged users, use localStorage
      if (typeof window !== "undefined") {
        const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
        if (storedLanguage && (storedLanguage === "en" || storedLanguage === "pt-BR")) {
          setCurrentLanguage(storedLanguage);
        }
      }
    }
  }, [session?.user?.systemLanguage, session?.user]);

  const handleLanguageChange = async (newLanguage: Language) => {
    // Save to localStorage for non-logged users
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
    }
    
    // If user is logged in, update in database
    if (session?.user) {
      const result = await updateLanguage(newLanguage);
      
      if (result.success) {
        // Update the session to reflect the new language
        await update();
        setCurrentLanguage(newLanguage);
      }
    } else {
      setCurrentLanguage(newLanguage);
    }
    
    // Refresh the page to apply translations
    router.refresh();
  };

  return (
    <Select
      value={currentLanguage}
      onValueChange={handleLanguageChange}
    >
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

