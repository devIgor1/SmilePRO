"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { Menu, Smile } from "lucide-react"
import { authButtons, navItems } from "./nav-config"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[380px] flex flex-col">
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
            Navigate through our services
          </SheetDescription>
        </SheetHeader>

        <nav className="flex-1 flex flex-col gap-1 py-6">
          {navItems.map((item) => (
            <SheetClose key={item.href} asChild>
              <Link
                href={item.href}
                className="flex items-center px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>

        <div className="space-y-3 pt-4 px-4 border-t">
          <SheetClose asChild>
            <Link href={authButtons.signIn.href} className="block">
              <Button variant="outline" className="w-full py-2">
                {authButtons.signIn.label}
              </Button>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={authButtons.getStarted.href} className="block">
              <Button className="w-full py-2">
                {authButtons.getStarted.label}
              </Button>
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}

