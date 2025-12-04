"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PLANS, getPlanFeatures, getPlanDescription } from "@/utils/plans";
import { useTranslations } from "@/hooks/use-translations";
import { PLANS_LIMITS } from "@/utils/permissions/plan-limits";

export function Pricing() {
  const t = useTranslations();
  const language = t.__language || "en";
  const planFeatures = getPlanFeatures(language);
  const formatPrice = (price: number) => price.toFixed(2).replace(".", ",");
  
  // Translate features for each plan
  const getTranslatedFeatures = (plan: typeof PLANS[0]) => {
    return plan.features.map((feature) => {
      if (feature.includes("Up to") || feature.includes("Até")) {
        const count = plan.id === "basic" 
          ? PLANS_LIMITS.BASIC.maxServices 
          : PLANS_LIMITS.PROFESSIONAL.maxServices;
        return planFeatures.upToServices(count);
      }
      if (feature.includes("Unlimited appointments") || feature.includes("Agendamentos ilimitados")) {
        return planFeatures.unlimitedAppointments;
      }
      if (feature.includes("Priority support") || feature.includes("Suporte prioritário")) {
        return planFeatures.prioritySupport;
      }
      if (feature.includes("Support") && !feature.includes("Priority")) {
        return planFeatures.support;
      }
      if (feature.includes("Reports") || feature.includes("Relatórios")) {
        return planFeatures.reports;
      }
      return feature;
    });
  };

  return (
    <section id="pricing" className="border-t py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-bold text-3xl text-balance md:text-4xl">
            {t.home.pricing.title}
          </h2>
          <p className="text-muted-foreground mt-4 text-balance text-lg">
            {t.home.pricing.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
          {PLANS.map((plan) => {
            return (
              <Card
                key={plan.id}
                className={plan.isPopular ? "border-primary shadow-lg" : ""}
              >
                <CardHeader>
                  {plan.isPopular && (
                    <Badge className="mb-2 w-fit">{t.home.pricing.mostPopular}</Badge>
                  )}
                  <CardTitle>
                    {plan.id === "basic" 
                      ? t.home.pricing.planNames.basic 
                      : t.home.pricing.planNames.professional}
                  </CardTitle>
                  <CardDescription>{getPlanDescription(plan.id, language)}</CardDescription>
                  <div className="mt-4">
                    {plan.originalPrice &&
                      plan.originalPrice !== plan.price && (
                        <div className="mb-2">
                          <span className="text-sm line-through text-muted-foreground">
                            R$ {formatPrice(plan.originalPrice)}
                          </span>
                        </div>
                      )}
                    <div className="flex items-baseline gap-1">
                      <span className="font-bold text-4xl">
                        R$ {formatPrice(plan.price)}
                      </span>
                      <span className="text-muted-foreground">
                        {language === "pt-BR" ? "/mês" : t.home.pricing.perMonth}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {getTranslatedFeatures(plan).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="size-5 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/dashboard/appointments" className="block">
                    <Button
                      className="w-full cursor-pointer"
                      variant={plan.buttonVariant}
                    >
                      {t.home.pricing.activateSubscription}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
