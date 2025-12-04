import { Plan as PrismaPlanType } from "@/lib/generated/prisma/enums";
import { PLANS_LIMITS } from "../permissions/plan-limits";

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonVariant?: "default" | "outline";
  type: PrismaPlanType;
}

// Helper function to get translated features
export function getPlanFeatures(language: "en" | "pt-BR" = "en") {
  const features = {
    en: {
      upToServices: (count: number) => `Up to ${count} services`,
      unlimitedAppointments: "Unlimited appointments",
      support: "Support",
      prioritySupport: "Priority support",
      reports: "Reports",
    },
    "pt-BR": {
      upToServices: (count: number) => `Até ${count} serviços`,
      unlimitedAppointments: "Agendamentos ilimitados",
      support: "Suporte",
      prioritySupport: "Suporte prioritário",
      reports: "Relatórios",
    },
  };

  return features[language];
}

// Helper function to get translated plan descriptions
export function getPlanDescription(planId: string, language: "en" | "pt-BR" = "en"): string {
  const descriptions = {
    en: {
      basic: "Perfect for smaller clinics",
      professional: "Ideal for large clinics",
    },
    "pt-BR": {
      basic: "Perfeito para clínicas menores",
      professional: "Ideal para grandes clínicas",
    },
  };

  return descriptions[language][planId as keyof typeof descriptions.en] || "";
}

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for smaller clinics",
    price: 27.9,
    originalPrice: 97.9,
    features: [
      `Up to ${PLANS_LIMITS.BASIC.maxServices} services`,
      "Unlimited appointments",
      "Support",
      "Reports",
    ],
    buttonText: "Activate subscription",
    buttonVariant: "outline",
    type: PrismaPlanType.BASIC,
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for large clinics",
    price: 97.9,
    originalPrice: 97.9,
    features: [
      `Up to ${PLANS_LIMITS.PROFESSIONAL.maxServices} services`,
      "Unlimited appointments",
      "Priority support",
      "Reports",
    ],
    isPopular: true,
    buttonText: "Activate subscription",
    buttonVariant: "default",
    type: PrismaPlanType.PROFESSIONAL,
  },
];
