"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Smile } from "lucide-react";
import { MobileNav } from "./MobileNav";
import { UserMenu } from "./UserMenu";
import { authButtons, navItems } from "./nav-config";
import { useSession } from "next-auth/react";
import { handleLogin } from "../_actions/login";
import { handleNavClick } from "./utils";

export function HomeHeader() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-muted-foreground hover:text-foreground text-sm lg:text-base transition-colors"
            >
              {item.label}
            </Link>
          ))}
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
                    {authButtons.signIn.label}
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
