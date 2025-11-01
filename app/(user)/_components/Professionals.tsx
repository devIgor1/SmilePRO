import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, Award, Calendar } from "lucide-react"
import Link from "next/link"

const professionals = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Orthodontist",
    credentials: "DDS, MS",
    image: "/professionals/dr-sarah.jpg",
    experience: "15 years",
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Periodontist",
    credentials: "DDS, MS",
    image: "/professionals/dr-chen.jpg",
    experience: "12 years",
    verified: true,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialization: "Pediatric Dentist",
    credentials: "DDS",
    image: "/professionals/dr-rodriguez.jpg",
    experience: "8 years",
    verified: true,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialization: "Oral Surgeon",
    credentials: "DDS, MD",
    image: "/professionals/dr-wilson.jpg",
    experience: "20 years",
    verified: true,
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    specialization: "Prosthodontist",
    credentials: "DDS, MS",
    image: "/professionals/dr-anderson.jpg",
    experience: "10 years",
    verified: true,
  },
  {
    id: 6,
    name: "Dr. Robert Martinez",
    specialization: "Endodontist",
    credentials: "DDS, MS",
    image: "/professionals/dr-martinez.jpg",
    experience: "14 years",
    verified: true,
  },
]

export function Professionals() {
  return (
    <section id="professionals" className="border-t py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-bold text-3xl text-balance md:text-4xl">
            Trusted by dental professionals
          </h2>
          <p className="text-muted-foreground mt-4 text-balance text-lg">
            Join thousands of dentists and specialists already using Smile PRO
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {professionals.map((professional) => (
            <Card key={professional.id} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="size-16 border-2 border-primary/20">
                    <AvatarImage src={professional.image} alt={professional.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                      {professional.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{professional.name}</h3>
                      {professional.verified && (
                        <Award className="size-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {professional.specialization}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <GraduationCap className="size-4" />
                    <span>{professional.credentials}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {professional.experience}
                  </Badge>
                </div>
                <div className="pt-2 text-xs text-muted-foreground">
                  Active on Smile PRO
                </div>
                <div className="pt-2">
                  <Link href={`/schedule/${professional.id}`}>
                    <Button className="w-full" size="sm">
                      <Calendar className="size-4" />
                      Schedule Appointment
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-muted-foreground text-sm">
            More than <span className="font-semibold text-foreground">5,000+</span> dental
            professionals trust Smile PRO to manage their practices
          </p>
        </div>
      </div>
    </section>
  )
}

