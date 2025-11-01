"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Smile } from "lucide-react"
import { MobileNav } from "./MobileNav"
import { UserMenu } from "./UserMenu"
import { authButtons, navItems } from "./nav-config"
import { useAuth } from "@/hooks/use-auth"

export function HomeHeader() {
  const { isAuthenticated, isLoading } = useAuth()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg sm:size-9">
            <Smile className="size-4 sm:size-5" />
          </div>
          <span className="font-bold text-lg sm:text-xl md:text-2xl">
            Smile{" "}
            <span className="text-primary hidden sm:inline">PRO</span>
            <span className="text-primary sm:hidden">P</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 lg:gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm lg:text-base transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {!isLoading && (
            <>
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <>
                  <Link href={authButtons.signIn.href}>
                    <Button
                      variant={authButtons.signIn.variant}
                      size="default"
                      className="hidden lg:flex"
                    >
                      {authButtons.signIn.label}
                    </Button>
                  </Link>
                  <Link href={authButtons.getStarted.href}>
                    <Button size="default" className="hidden lg:flex">
                      {authButtons.getStarted.label}
                    </Button>
                  </Link>
                  <Link href={authButtons.signIn.href} className="lg:hidden">
                    <Button variant={authButtons.signIn.variant} size="default">
                      {authButtons.signIn.label}
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  )
}
