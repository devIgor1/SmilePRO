import { Calendar, Users, BarChart3, Clock, Shield, Zap } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function Features() {
  return (
    <section id="features" className="border-t bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-bold text-3xl text-balance md:text-4xl">Everything you need to run your clinic</h2>
            <p className="text-muted-foreground mt-4 text-balance text-lg">
              Powerful features designed to save time and improve patient care
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                  <Calendar className="size-6" />
                </div>
                <CardTitle>Smart Scheduling</CardTitle>
                <CardDescription>
                  Intuitive calendar view with easy appointment management and public online booking for your patients
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                  <Users className="size-6" />
                </div>
                <CardTitle>Patient Management</CardTitle>
                <CardDescription>
                  Complete patient profiles with contact information, notes, photos, and full appointment history
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                  <BarChart3 className="size-6" />
                </div>
                <CardTitle>Analytics & Insights</CardTitle>
                <CardDescription>
                  Track revenue trends, monitor appointment statistics, and view key performance metrics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                  <Clock className="size-6" />
                </div>
                <CardTitle>Service Management</CardTitle>
                <CardDescription>
                  Create and manage your clinic services with pricing, duration, and availability settings
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                  <Shield className="size-6" />
                </div>
                <CardTitle>Secure & Reliable</CardTitle>
                <CardDescription>
                  Secure authentication, data protection, and reliable infrastructure to keep your clinic data safe
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                  <Zap className="size-6" />
                </div>
                <CardTitle>Easy to Use</CardTitle>
                <CardDescription>
                  Simple, intuitive interface designed for dental professionals. Get started in minutes with no training needed
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
  )
}