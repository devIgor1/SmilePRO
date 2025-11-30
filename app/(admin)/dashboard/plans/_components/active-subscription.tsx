import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { PLANS } from "@/utils/plans";
import { formatPrice } from "@/lib/utils";
import type { Plan } from "@/lib/generated/prisma/enums";

interface ActiveSubscriptionProps {
  plan: Plan;
  createdAt: Date;
}

export function ActiveSubscription({
  plan,
  createdAt,
}: ActiveSubscriptionProps) {
  const planDetails = PLANS.find((p) => p.id === plan.toLowerCase());

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl text-center mb-8">
        <h1 className="font-bold text-3xl text-balance md:text-4xl">
          Your Subscription is Active
        </h1>
        <p className="text-muted-foreground mt-4 text-balance text-lg">
          You're all set! Enjoy all the features of your plan.
        </p>
      </div>

      <div className="mx-auto max-w-md">
        <Card className="border-primary shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-primary hover:bg-primary/80">
                <CheckCircle2 className="size-3 mr-1" />
                Active
              </Badge>
              {planDetails?.isPopular && (
                <Badge variant="outline">Most Popular</Badge>
              )}
            </div>
            <CardTitle>{planDetails?.name || plan}</CardTitle>
            <CardDescription>{planDetails?.description}</CardDescription>
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
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {planDetails?.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Subscribed since{" "}
                {new Date(createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
