"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { ClinicInfo } from "../_data-access/get-clinic-info";

interface ClinicHeaderProps {
  clinic: ClinicInfo;
}

export function ClinicHeader({ clinic }: ClinicHeaderProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="border-primary/20">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Clinic Avatar */}
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage src={clinic.image || undefined} alt={clinic.name} />
            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
              {getInitials(clinic.name)}
            </AvatarFallback>
          </Avatar>

          {/* Clinic Info */}
          <div className="flex-1 space-y-3">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">
                {clinic.name}
              </h1>
              <Badge variant="default" className="w-fit">
                Ativo
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {clinic.address && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{clinic.address}</span>
                </div>
              )}
              {clinic.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{clinic.phone}</span>
                </div>
              )}
              {clinic.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{clinic.email}</span>
                </div>
              )}
              {clinic.timeslots.length > 0 && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {clinic.timeslots[0]} -{" "}
                    {clinic.timeslots[clinic.timeslots.length - 1]}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
