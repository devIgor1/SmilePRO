import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PLANS } from "@/utils/plans"

export function Pricing() {
  const formatPrice = (price: number) => price.toFixed(2).replace(".", ",");

  return (
    <section id="pricing" className="border-t py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-bold text-3xl text-balance md:text-4xl">Simple, transparent pricing</h2>
            <p className="text-muted-foreground mt-4 text-balance text-lg">
              Choose the plan that fits your practice size
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
                      <Badge className="mb-2 w-fit">Most Popular</Badge>
                    )}
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      {plan.originalPrice && plan.originalPrice !== plan.price && (
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
                          /month
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="size-5 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/dashboard/appointments" className="block">
                      <Button
                        className="w-full"
                        variant={plan.buttonVariant}
                      >
                        {plan.buttonText}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
  )
}