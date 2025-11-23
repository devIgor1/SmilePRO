"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign } from "lucide-react";
import type { ClinicInfo } from "../_data-access/get-clinic-info";

interface ServicesListProps {
  services: ClinicInfo["services"];
}

export function ServicesList({ services }: ServicesListProps) {
  if (services.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Available Services</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No services available at this time.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Services</CardTitle>
        <CardDescription>
          Choose from our professional dental services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <Card key={service.id} className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                {service.description && (
                  <CardDescription>{service.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {service.duration} min
                  </Badge>
                  <Badge variant="default" className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    R$ {(service.price / 100).toFixed(2)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

