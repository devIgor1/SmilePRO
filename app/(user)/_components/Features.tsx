"use client";

import { Calendar, Users, BarChart3, Clock, Shield, Zap } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useTranslations } from "@/hooks/use-translations";

export function Features() {
  const t = useTranslations();
  
  return (
    <section id="features" className="border-t bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-bold text-3xl text-balance md:text-4xl">
            {t.home.features.title}
          </h2>
          <p className="text-muted-foreground mt-4 text-balance text-lg">
            {t.home.features.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                <Calendar className="size-6" />
              </div>
              <CardTitle>{t.home.features.smartScheduling.title}</CardTitle>
              <CardDescription>
                {t.home.features.smartScheduling.description}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                <Users className="size-6" />
              </div>
              <CardTitle>{t.home.features.patientManagement.title}</CardTitle>
              <CardDescription>
                {t.home.features.patientManagement.description}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                <BarChart3 className="size-6" />
              </div>
              <CardTitle>{t.home.features.analytics.title}</CardTitle>
              <CardDescription>
                {t.home.features.analytics.description}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                <Clock className="size-6" />
              </div>
              <CardTitle>{t.home.features.serviceManagement.title}</CardTitle>
              <CardDescription>
                {t.home.features.serviceManagement.description}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                <Shield className="size-6" />
              </div>
              <CardTitle>{t.home.features.secure.title}</CardTitle>
              <CardDescription>
                {t.home.features.secure.description}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                <Zap className="size-6" />
              </div>
              <CardTitle>{t.home.features.easyToUse.title}</CardTitle>
              <CardDescription>
                {t.home.features.easyToUse.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
