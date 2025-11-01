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
                  Intuitive calendar with drag-and-drop appointments, automated reminders, and online booking
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
                  Complete patient profiles with medical history, treatment plans, and appointment records
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
                  Track revenue, monitor performance, and make data-driven decisions with detailed reports
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                  <Clock className="size-6" />
                </div>
                <CardTitle>Automated Reminders</CardTitle>
                <CardDescription>
                  Reduce no-shows with SMS and email reminders sent automatically to patients
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                  <Shield className="size-6" />
                </div>
                <CardTitle>HIPAA Compliant</CardTitle>
                <CardDescription>
                  Enterprise-grade security with encrypted data storage and HIPAA compliance built-in
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                  <Zap className="size-6" />
                </div>
                <CardTitle>Quick Setup</CardTitle>
                <CardDescription>
                  Get started in minutes with our guided onboarding and import your existing patient data
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
  )
}