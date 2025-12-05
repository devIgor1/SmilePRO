"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { handleLogin } from "../_actions/login";
export function CTA() {
  return (
    <section className="border-t bg-primary py-20 text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-bold text-3xl text-balance md:text-4xl">
          Pronto para transformar sua clínica?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-lg opacity-90">
          Junte-se a centenas de clínicas odontológicas que já usam o SmilePro
          para simplificar suas operações
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto cursor-pointer"
            onClick={() => handleLogin("google")}
          >
            Iniciar Teste Grátis
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
