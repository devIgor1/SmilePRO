"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Clock,
  DollarSign,
  MoreVertical,
  Sparkles,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ServiceFormDialog } from "./service-form-dialog";
import { deleteService } from "../_data-access/delete-service";
import { useRouter } from "next/navigation";
import type { Service } from "@/lib/types";
import { ResultPermissionProp } from "@/utils/permissions/canPermission";
import { PLANS_LIMITS } from "@/utils/permissions/plan-limits";

interface ServiceContentProps {
  userId: string;
  initialServices: Service[];
  permissions: ResultPermissionProp;
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

export default function ServiceContent({
  userId,
  initialServices,
  permissions,
}: ServiceContentProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isRedirecting, startRedirectTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

  // Get the max services limit based on the plan
  const getMaxServices = () => {
    if (permissions.planId === "BASIC") {
      return PLANS_LIMITS.BASIC.maxServices;
    }
    if (permissions.planId === "PROFESSIONAL") {
      return PLANS_LIMITS.PROFESSIONAL.maxServices;
    }
    // For TRIAL or EXPIRED, show all services (or you can set a default limit)
    return initialServices.length;
  };

  const maxServices = getMaxServices();
  const displayedServices = initialServices.slice(0, maxServices);
  const hasMoreServices = initialServices.length > maxServices;

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  const handleDelete = (service: Service) => {
    setServiceToDelete(service);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!serviceToDelete) return;

    startTransition(async () => {
      try {
        await deleteService(serviceToDelete.id);
        setIsDeleteDialogOpen(false);
        setServiceToDelete(null);
        router.refresh();
      } catch (error) {
        console.error("Failed to delete service:", error);
      }
    });
  };

  const handleNewService = () => {
    setSelectedService(null);
    setIsDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setSelectedService(null);
    }
    setIsDialogOpen(open);
  };

  const handleRedirectToPlans = () => {
    startRedirectTransition(() => {
      router.push("/dashboard/plans");
    });
  };

  return (
    <>
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
          {permissions.hasPermission && (
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleNewService}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Service
            </Button>
          )}
          {!permissions.hasPermission && (
            <Button
              onClick={handleRedirectToPlans}
              className="bg-primary hover:bg-primary/90 cursor-pointer"
              disabled={isRedirecting}
            >
              {isRedirecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Redirecting to plans...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Upgrade to create more services
                </>
              )}
            </Button>
          )}
        </div>

        {/* Services Grid */}
        {initialServices.length === 0 ? (
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
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={handleNewService}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Service
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayedServices.map((service) => (
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
                          <DropdownMenuItem onClick={() => handleEdit(service)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDelete(service)}
                          >
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
            {hasMoreServices && (
              <Card className="border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 mt-6">
                <CardContent className="pt-6 pb-6 px-6 flex flex-col items-center justify-center text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    You have {initialServices.length} services, but your plan
                    only allows viewing {maxServices} services.
                  </p>
                  <Button
                    onClick={handleRedirectToPlans}
                    className="bg-primary hover:bg-primary/90"
                    disabled={isRedirecting}
                  >
                    {isRedirecting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redirecting...
                      </>
                    ) : (
                      "Upgrade to view all services"
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      {/* Service Form Dialog */}
      <ServiceFormDialog
        open={isDialogOpen}
        onOpenChange={handleDialogClose}
        service={selectedService}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure? This will permanently delete the service "
              {serviceToDelete?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
