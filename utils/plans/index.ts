import { Plan as PrismaPlanType } from "@/lib/generated/prisma/enums";

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

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for smaller clinics",
    price: 27.9,
    originalPrice: 97.9,
    features: [
      "Up to 3 services",
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
      "Up to 40 services",
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
