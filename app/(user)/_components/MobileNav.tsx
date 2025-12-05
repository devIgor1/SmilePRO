"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Menu, Smile, Settings, LogOut } from "lucide-react";
import { authButtons } from "./nav-config";
import { useSession, signOut } from "next-auth/react";
import { handleNavClick } from "./utils";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslations } from "@/hooks/use-translations";

export function MobileNav() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isAuthenticated = !!user;
  const isLoading = status === "loading";
  const t = useTranslations();

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || "";

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[300px] sm:w-[380px] flex flex-col"
      >
        <SheetHeader className="space-y-3 pb-6 border-b">
          <SheetTitle className="flex items-center gap-2.5 text-left">
            <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-lg shrink-0">
              <Smile className="size-5" />
            </div>
            <span className="font-bold text-xl">
              Smile <span className="text-primary">PRO</span>
            </span>
          </SheetTitle>
          <SheetDescription className="text-left">
            {t.nav.navigation}
          </SheetDescription>
        </SheetHeader>

        <nav className="flex-1 flex flex-col gap-1 py-6">
          <SheetClose asChild>
            <Link
              href="#features"
              onClick={(e) => handleNavClick(e, "#features")}
              className="flex items-center px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              {t.nav.features}
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="#pricing"
              onClick={(e) => handleNavClick(e, "#pricing")}
              className="flex items-center px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              {t.nav.pricing}
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="#professionals"
              onClick={(e) => handleNavClick(e, "#professionals")}
              className="flex items-center px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              {t.nav.professionals}
            </Link>
          </SheetClose>
          <div className="px-4 py-3">
            <LanguageSelector />
          </div>
        </nav>

        {!isLoading && (
          <div className="space-y-3 pt-4 px-4 border-t">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent/50">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.image || undefined}
                      alt={user.name || "User"}
                    />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate">
                      {user.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground leading-none truncate mt-1">
                      {user.email}
                    </p>
                  </div>
                </div>
                <SheetClose asChild>
                  <Link
                    href="/dashboard/appointments"
                    className="flex items-center px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                  >
                    <Settings className="mr-3 h-5 w-5" />
                    {t.nav.appointments}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center w-full px-4 py-3 text-base font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    {t.nav.logOut}
                  </button>
                </SheetClose>
              </>
            ) : (
              <>
                <SheetClose asChild>
                  <Link href="/dashboard/appointments" className="block">
                    <Button variant="outline" className="w-full py-2">
                      {t.nav.signIn}
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={authButtons.getStarted.href} className="block">
                    <Button className="w-full py-2">{t.nav.getStarted}</Button>
                  </Link>
                </SheetClose>
              </>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
