"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroImage from "@/public/heroImage.png";
import { handleLogin } from "../_actions/login";

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="mr-1 size-3" />
              Trusted by 500+ dental clinics
            </Badge>
            <h1 className="font-bold text-4xl text-balance leading-tight md:text-5xl lg:text-6xl mt-4">
              Modern Practice Management for{" "}
              <span className="text-primary">Dental Clinics</span>
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-balance text-lg md:text-xl lg:mx-0">
              Streamline appointments, manage patients, and grow your practice
              with our all-in-one platform designed specifically for dental
              professionals.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => handleLogin("github")}
              >
                Start Free Trial
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent"
                >
                  See How It Works
                </Button>
              </Link>
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              No credit card required • 14-day free trial
            </p>
          </div>

          <div className="relative w-full">
            <div className="rounded-xl border bg-muted/50 p-2 shadow-2xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-background">
                <Image
                  src={heroImage}
                  alt="Smiley Dashboard Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
