"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Smile } from "lucide-react";
import { MobileNav } from "./MobileNav";
import { UserMenu } from "./UserMenu";
import { authButtons } from "./nav-config";
import { useSession } from "next-auth/react";
import { handleLogin } from "../_actions/login";
import { handleNavClick } from "./utils";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslations } from "@/hooks/use-translations";

export function HomeHeader() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const t = useTranslations();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg sm:size-9">
            <Smile className="size-4 sm:size-5" />
          </div>
          <span className="font-bold text-lg sm:text-xl md:text-2xl">
            Smile <span className="text-primary">PRO</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 lg:gap-6 md:flex">
          <Link
            href="#features"
            onClick={(e) => handleNavClick(e, "#features")}
            className="text-muted-foreground hover:text-foreground text-sm lg:text-base transition-colors"
          >
            {t.nav.features}
          </Link>
          <Link
            href="#pricing"
            onClick={(e) => handleNavClick(e, "#pricing")}
            className="text-muted-foreground hover:text-foreground text-sm lg:text-base transition-colors"
          >
            {t.nav.pricing}
          </Link>
          <Link
            href="#professionals"
            onClick={(e) => handleNavClick(e, "#professionals")}
            className="text-muted-foreground hover:text-foreground text-sm lg:text-base transition-colors"
          >
            {t.nav.professionals}
          </Link>
          <LanguageSelector />
          {!isLoading && (
            <>
              {session?.user ? (
                <UserMenu />
              ) : (
                <>
                  <Button
                    variant={authButtons.signIn.variant}
                    size="default"
                    className="hidden lg:flex cursor-pointer bg-primary/40"
                    onClick={() => handleLogin("google")}
                  >
                    {t.nav.signIn}
                  </Button>
                </>
              )}
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  );
}
