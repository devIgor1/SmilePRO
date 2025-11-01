import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Pricing() {
  return (
    <section id="pricing" className="border-t py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-bold text-3xl text-balance md:text-4xl">Simple, transparent pricing</h2>
            <p className="text-muted-foreground mt-4 text-balance text-lg">
              Choose the plan that fits your practice size
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>Perfect for small practices</CardDescription>
                <div className="mt-4">
                  <span className="font-bold text-4xl">$49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span className="text-sm">Up to 100 patients</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span className="text-sm">Online scheduling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span className="text-sm">Email reminders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span className="text-sm">Basic analytics</span>
                  </li>
                </ul>
                <Link href="/dashboard" className="block">
                  <Button className="w-full bg-transparent" variant="outline">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-primary shadow-lg">
              <CardHeader>
                <Badge className="mb-2 w-fit">Most Popular</Badge>
                <CardTitle>Professional</CardTitle>
                <CardDescription>For growing practices</CardDescription>
                <div className="mt-4">
                  <span className="font-bold text-4xl">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span className="text-sm">Up to 500 patients</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span className="text-sm">SMS & email reminders</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span className="text-sm">Custom branding</span>
                  </li>
                </ul>
                <Link href="/dashboard" className="block">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For large clinics</CardDescription>
                <div className="mt-4">
                  <span className="font-bold text-4xl">$199</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span className="text-sm">Unlimited patients</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span className="text-sm">Multi-location support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span className="text-sm">API access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span className="text-sm">Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-primary" />
                    <span className="text-sm">Custom integrations</span>
                  </li>
                </ul>
                <Link href="/dashboard" className="block">
                  <Button className="w-full bg-transparent" variant="outline">
                    Contact Sales
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
  )
}