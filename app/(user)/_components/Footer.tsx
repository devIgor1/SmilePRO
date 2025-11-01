import Link from "next/link";
import { Smile } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-12">
    <div className="container mx-auto px-4">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-lg">
              <Smile className="size-5" />
            </div>
            <span className="font-bold text-lg sm:text-xl md:text-2xl">
            Smile{" "}
            <span className="text-primary hidden sm:inline">PRO</span>
            <span className="text-primary sm:hidden">P</span>
          </span>
          </Link>
          <p className="text-muted-foreground mt-4 text-sm">Modern practice management for dental clinics</p>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Product</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#features" className="text-muted-foreground hover:text-foreground">
                Features
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Security
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t mt-12 pt-8 text-center text-muted-foreground text-sm">
        © 2025 Smile PRO. All rights reserved.
      </div>
    </div>
  </footer>
  )
}