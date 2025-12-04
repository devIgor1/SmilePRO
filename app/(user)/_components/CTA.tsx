import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

    export function CTA() {
  return (
    <section className="border-t bg-primary py-20 text-primary-foreground">
    <div className="container mx-auto px-4 text-center">
      <h2 className="font-bold text-3xl text-balance md:text-4xl">Ready to transform your practice?</h2>
      <p className="mx-auto mt-4 max-w-2xl text-balance text-lg opacity-90">
        Join hundreds of dental clinics already using Smiley to streamline their operations
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link href="/dashboard/appointments">
          <Button size="lg" variant="secondary" className="w-full sm:w-auto">
            Start Free Trial
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </Link>
        <Link href="#features">
          <Button
            size="lg"
            variant="outline"
            className="w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
          >
            Schedule a Demo
          </Button>
        </Link>
      </div>
    </div>
  </section>
  )
}