import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Award, Briefcase } from "lucide-react"
import Link from "next/link"
import dayjs from "dayjs"
import type { ActiveClinic } from "../_data-access/get-active-clinics"

interface ProfessionalsProps {
  clinics: ActiveClinic[];
}

export function Professionals({ clinics }: ProfessionalsProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getYearsSince = (date: Date) => {
    const years = dayjs().diff(dayjs(date), "year");
    return years > 0 ? `${years}+ years` : "New";
  };

  if (clinics.length === 0) {
    return (
      <section id="professionals" className="border-t py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-bold text-3xl text-balance md:text-4xl">
              Featured Dental Clinics
            </h2>
            <p className="text-muted-foreground mt-4 text-balance text-lg">
              No clinics available for booking at this time. Check back soon!
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
            Featured Dental Clinics
          </h2>
          <p className="text-muted-foreground mt-4 text-balance text-lg">
            Book appointments with verified dental professionals near you
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clinics.map((clinic) => (
            <Card key={clinic.id} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="size-16 border-2 border-primary/20">
                    <AvatarImage src={clinic.image || undefined} alt={clinic.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                      {getInitials(clinic.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{clinic.name}</h3>
                      <Award className="size-4 text-primary" title="Verified Clinic" />
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
                    {clinic._count.services} service{clinic._count.services !== 1 ? "s" : ""}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {getYearsSince(clinic.createdAt)} on platform
                  </Badge>
                </div>
                <div className="pt-2 text-xs text-muted-foreground">
                  {clinic._count.appointments}+ appointments completed
                </div>
                <div className="pt-2">
                  <Link href={`/clinic/${clinic.id}`}>
                    <Button className="w-full" size="sm">
                      <Calendar className="size-4 mr-2" />
                      Book Appointment
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-muted-foreground text-sm">
            Showing <span className="font-semibold text-foreground">{clinics.length}</span> featured
            {clinics.length === 1 ? " clinic" : " clinics"} accepting online bookings
          </p>
        </div>
      </div>
    </section>
  )
}

