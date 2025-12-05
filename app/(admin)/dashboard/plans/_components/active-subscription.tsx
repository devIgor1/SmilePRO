import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { PLANS, getPlanFeatures, getPlanDescription } from "@/utils/plans";
import { formatPrice } from "@/lib/utils";
import type { Plan } from "@/lib/generated/prisma/enums";
import { ManageSubscriptionButton } from "./manage-subscription-button";
import { PLANS_LIMITS } from "@/utils/permissions/plan-limits";

interface ActiveSubscriptionProps {
  plan: Plan;
  createdAt: Date;
}

export async function ActiveSubscription({
  plan,
  createdAt,
}: ActiveSubscriptionProps) {
  const planDetails = PLANS.find((p) => p.id === plan.toLowerCase());

  // Always use Portuguese
  const language = "pt-BR";
  const planFeatures = getPlanFeatures(language);

  // Format date based on language
  const formatDate = (date: Date, lang: "en" | "pt-BR") => {
    const months = {
      en: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      "pt-BR": [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
      ],
    };

    const month = months[lang][date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    if (lang === "pt-BR") {
      return `${day} de ${month} de ${year}`;
    }
    return `${month} ${day}, ${year}`;
  };

  // Translate features based on plan
  const translatedFeatures =
    planDetails?.features.map((feature) => {
      if (feature.includes("Up to") || feature.includes("Até")) {
        const count =
          planDetails.id === "basic"
            ? PLANS_LIMITS.BASIC.maxServices
            : PLANS_LIMITS.PROFESSIONAL.maxServices;
        return planFeatures.upToServices(count);
      }
      if (
        feature.includes("Unlimited appointments") ||
        feature.includes("Agendamentos ilimitados")
      ) {
        return planFeatures.unlimitedAppointments;
      }
      if (
        feature.includes("Priority support") ||
        feature.includes("Suporte prioritário")
      ) {
        return planFeatures.prioritySupport;
      }
      if (feature.includes("Support") && !feature.includes("Priority")) {
        return planFeatures.support;
      }
      if (feature.includes("Reports") || feature.includes("Relatórios")) {
        return planFeatures.reports;
      }
      return feature;
    }) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl text-center mb-8">
        <h1 className="font-bold text-3xl text-balance md:text-4xl">
          Sua Assinatura Está Ativa
        </h1>
        <p className="text-muted-foreground mt-4 text-balance text-lg">
          Tudo pronto! Aproveite todos os recursos do seu plano.
        </p>
      </div>

      <div className="mx-auto max-w-md">
        <Card className="border-primary shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-primary hover:bg-primary/80">
                <CheckCircle2 className="size-3 mr-1" />
                Ativo
              </Badge>
              {planDetails?.isPopular && (
                <Badge variant="outline">Mais Popular</Badge>
              )}
            </div>
            <CardTitle>
              {planDetails?.id === "basic" ? "Básico" : "Profissional"}
            </CardTitle>
            <CardDescription>
              {planDetails ? getPlanDescription(planDetails.id, language) : ""}
            </CardDescription>
            <div className="mt-4">
              {planDetails?.originalPrice &&
                planDetails.originalPrice !== planDetails.price && (
                  <div className="mb-2">
                    <span className="text-sm line-through text-muted-foreground">
                      R$ {formatPrice(planDetails.originalPrice)}
                    </span>
                  </div>
                )}
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-4xl">
                  R$ {planDetails ? formatPrice(planDetails.price) : "—"}
                </span>
                <span className="text-muted-foreground">
                  {language === "pt-BR" ? "/mês" : "/month"}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {translatedFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t space-y-4">
              <p className="text-sm text-muted-foreground">
                Assinado desde {formatDate(new Date(createdAt), language)}
              </p>
              <ManageSubscriptionButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
