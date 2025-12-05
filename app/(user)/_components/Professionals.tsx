"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Award, Briefcase, Star } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import type { ActiveClinic } from "../_data-access/get-active-clinics";
import { useTranslations } from "@/hooks/use-translations";

interface ProfessionalsProps {
  clinics: ActiveClinic[];
}

export function Professionals({ clinics }: ProfessionalsProps) {
  const t = useTranslations();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (clinics.length === 0) {
    return (
      <section id="professionals" className="border-t py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-bold text-3xl text-balance md:text-4xl">
              {t.home.professionals.title}
            </h2>
            <p className="text-muted-foreground mt-4 text-balance text-lg">
              {t.home.professionals.noClinics}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="professionals" className="border-t py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-bold text-3xl text-balance md:text-4xl">
            {t.home.professionals.title}
          </h2>
          <p className="text-muted-foreground mt-4 text-balance text-lg">
            {t.home.professionals.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...clinics]
            .sort((a, b) => {
              // Sort PROFESSIONAL clinics first
              if (a.plan === "PROFESSIONAL" && b.plan !== "PROFESSIONAL")
                return -1;
              if (a.plan !== "PROFESSIONAL" && b.plan === "PROFESSIONAL")
                return 1;
              return 0;
            })
            .map((clinic) => {
              const isProfessional = clinic.plan === "PROFESSIONAL";
              return (
                <Card
                  key={clinic.id}
                  className={`relative transition-all hover:shadow-lg transition-shadow ${
                    isProfessional
                      ? "border-2 border-primary shadow-md ring-2 ring-primary/20"
                      : ""
                  }`}
                >
                  {isProfessional && (
                    <div className="absolute top-2 right-2 z-10">
                      <Badge
                        variant="default"
                        className="bg-primary text-primary-foreground shadow-lg"
                      >
                        <Star className="size-3 mr-1 fill-current" />
                        {t.home.professionals.title.includes("Destaque")
                          ? "PROFISSIONAL"
                          : "PROFESSIONAL"}
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar
                        className={`size-16 border-2 ${
                          isProfessional
                            ? "border-primary shadow-md"
                            : "border-primary/20"
                        }`}
                      >
                        <AvatarImage
                          src={clinic.image || undefined}
                          alt={clinic.name}
                        />
                        <AvatarFallback
                          className={`text-lg font-semibold ${
                            isProfessional
                              ? "bg-primary/20 text-primary"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {getInitials(clinic.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`font-semibold text-lg ${
                              isProfessional ? "text-primary" : ""
                            }`}
                          >
                            {clinic.name}
                          </h3>
                          <Award
                            className="size-4 text-primary"
                            aria-label="Verified Clinic"
                          />
                        </div>
                        {clinic.address && (
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="size-3" />
                            {clinic.address}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap text-sm">
                      <Badge variant="secondary" className="text-xs">
                        <Briefcase className="size-3 mr-1" />
                        {clinic._count.services} {t.home.professionals.services}
                        {clinic._count.services !== 1 &&
                        t.home.professionals.services === "service"
                          ? "s"
                          : ""}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {t.home.professionals.activeClinic}
                      </Badge>
                    </div>
                    <div className="pt-2 text-xs text-muted-foreground">
                      {clinic._count.appointments}+{" "}
                      {t.home.professionals.appointmentsCompleted}
                    </div>
                    <div className="pt-2">
                      <Link href={`/clinic/${clinic.id}`}>
                        <Button className="w-full cursor-pointer" size="sm">
                          <Calendar className="size-4 mr-2" />
                          {t.home.professionals.bookAppointment}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-muted-foreground text-sm">
            {t.home.professionals.showing}{" "}
            <span className="font-semibold text-foreground">
              {clinics.length}
            </span>{" "}
            {t.home.professionals.featured}{" "}
            {clinics.length === 1
              ? t.home.professionals.clinic
              : t.home.professionals.clinics}{" "}
            {t.home.professionals.acceptingBookings}
          </p>
        </div>
      </div>
    </section>
  );
}
