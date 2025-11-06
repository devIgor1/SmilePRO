import { getAllServices } from "../_data-access/get-all-services";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, DollarSign, MoreVertical, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ServiceContentProps {
  userId: string;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price / 100);
}

function formatDuration(duration: number): string {
  if (duration < 60) {
    return `${duration} min`;
  }
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  if (minutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}min`;
}

export default async function ServiceContent({ userId }: ServiceContentProps) {
  const services = await getAllServices(userId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Services
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your clinic services and pricing
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Service
        </Button>
      </div>

      {/* Services Grid */}
      {services.length === 0 ? (
        <Card className="border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden p-0 flex flex-col">
          <CardContent className="pt-12 pb-12 px-6 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No services yet</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Create your first service to start accepting appointments. Add
              services like consultations, cleanings, and treatments.
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Service
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden p-0 flex flex-col hover:shadow-lg transition-shadow"
            >
              <CardHeader className="border-b border-primary/10 bg-primary/10 rounded-t-xl px-6 pt-6 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-primary mb-1">
                      {service.name}
                    </CardTitle>
                    {service.description && (
                      <CardDescription className="text-sm mt-1 line-clamp-2">
                        {service.description}
                      </CardDescription>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-6 px-6 pb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm font-medium">Price</span>
                  </div>
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(service.price)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">Duration</span>
                  </div>
                  <Badge variant="secondary" className="font-medium">
                    {formatDuration(service.duration)}
                  </Badge>
                </div>
                <div className="pt-2 border-t border-primary/10">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Status</span>
                    <Badge
                      variant={service.isActive ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {service.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
