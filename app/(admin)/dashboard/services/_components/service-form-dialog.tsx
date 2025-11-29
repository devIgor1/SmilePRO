"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createService } from "../_data-access/create-service";
import { updateService } from "../_data-access/update-service";
import { serviceFormSchema } from "../_schemas/service-form-schema";
import { useRouter } from "next/navigation";
import type { Service } from "@/lib/types";
import { toast } from "sonner";

interface ServiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: Pick<
    Service,
    "id" | "name" | "description" | "price" | "duration"
  > | null;
}

export function ServiceFormDialog({
  open,
  onOpenChange,
  service,
}: ServiceFormDialogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
  });

  // Update form data when dialog opens or service changes
  useEffect(() => {
    if (open) {
      setFormData({
        name: service?.name || "",
        description: service?.description || "",
        price: service?.price ? (service.price / 100).toString() : "",
        duration: service?.duration?.toString() || "",
      });
      setErrors({});
    }
  }, [open, service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert price to cents and duration to number
    const data = {
      name: formData.name,
      description: formData.description,
      price: Math.round(parseFloat(formData.price || "0") * 100),
      duration: parseInt(formData.duration || "0"),
    };

    // Validate
    const validationResult = serviceFormSchema.safeParse(data);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    startTransition(async () => {
      try {
        if (service) {
          await updateService({ id: service.id, ...validationResult.data });
          toast.success("Service updated successfully");
        } else {
          await createService(validationResult.data);
          toast.success("Service created successfully");
        }
        setErrors({});
        onOpenChange(false);
        router.refresh();
        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          duration: "",
        });
      } catch (error) {
        console.error("Failed to save service:", error);
        toast.error("Failed to save service. Please try again.");
        setErrors({ submit: "Failed to save service. Please try again." });
      }
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !isPending) {
      setErrors({});
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <TooltipProvider>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {service ? "Update Service" : "Create Service"}
              </DialogTitle>
              <DialogDescription>
                {service
                  ? "Update the service details below"
                  : "Add a new service to your clinic"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Service Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) {
                      setErrors({ ...errors, name: "" });
                    }
                  }}
                  placeholder="e.g., Teeth Cleaning"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    if (errors.description) {
                      setErrors({ ...errors, description: "" });
                    }
                  }}
                  placeholder="Brief description of the service"
                  rows={3}
                  className={errors.description ? "border-destructive" : ""}
                />
                {errors.description && (
                  <p className="text-xs text-destructive">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">
                    Price (R$) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => {
                      setFormData({ ...formData, price: e.target.value });
                      if (errors.price) {
                        setErrors({ ...errors, price: "" });
                      }
                    }}
                    placeholder="150.00"
                    className={errors.price ? "border-destructive" : ""}
                  />
                  {errors.price && (
                    <p className="text-xs text-destructive">{errors.price}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="duration" className="flex items-center gap-2">
                    Duration (min) <span className="text-destructive">*</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="inline-flex">
                          <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Enter the appointment duration in minutes. Common values: 30, 45, 60, 90, 120
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    min="5"
                    value={formData.duration}
                    onChange={(e) => {
                      setFormData({ ...formData, duration: e.target.value });
                      if (errors.duration) {
                        setErrors({ ...errors, duration: "" });
                      }
                    }}
                    placeholder="60"
                    className={errors.duration ? "border-destructive" : ""}
                  />
                  {errors.duration && (
                    <p className="text-xs text-destructive">
                      {errors.duration}
                    </p>
                  )}
                </div>
              </div>

              {errors.submit && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
                  <p className="text-sm text-destructive">{errors.submit}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : service ? (
                  "Update Service"
                ) : (
                  "Create Service"
                )}
              </Button>
            </DialogFooter>
          </form>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
}
