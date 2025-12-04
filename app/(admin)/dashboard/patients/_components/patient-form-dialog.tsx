"use client";

import { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "@/hooks/use-translations";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import type { Patient } from "@/lib/types";
import { formatDateByLanguage } from "@/lib/utils/date-formatter";
import { useSession } from "next-auth/react";
import {
  patientFormSchema,
  type PatientFormValues,
} from "../_schemas/patient-form-schema";
import { updatePatient } from "../_data-access/update-patient";
import { toast } from "sonner";

interface PatientFormDialogProps {
  patient: Patient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function PatientFormDialog({
  patient,
  open,
  onOpenChange,
  onSuccess,
}: PatientFormDialogProps) {
  const t = useTranslations();
  const { data: session } = useSession();
  const language = (session?.user?.systemLanguage as "en" | "pt-BR") || "en";
  const [isPending, startTransition] = useTransition();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      dateOfBirth: patient.dateOfBirth || null,
      address: patient.address || "",
      notes: patient.notes || "",
    },
  });

  // Update form when patient changes or dialog opens
  useEffect(() => {
    if (open) {
      reset({
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        dateOfBirth: patient.dateOfBirth || null,
        address: patient.address || "",
        notes: patient.notes || "",
      });
    }
  }, [open, patient, reset]);

  const dateOfBirth = watch("dateOfBirth");

  const onSubmit = async (data: PatientFormValues) => {
    startTransition(async () => {
      try {
        await updatePatient({
          id: patient.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          dateOfBirth: data.dateOfBirth || null,
          address: data.address || null,
          notes: data.notes || null,
        });

        toast.success(t.profile.patientUpdated);
        onOpenChange(false);
        onSuccess?.();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : t.profile.failedToUpdate
        );
      }
    });
  };

  if (!isMounted) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.profile.updatePatient}</DialogTitle>
          <DialogDescription>
            {t.profile.updatePatientDescription}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                {t.patients.name} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder={t.patients.name}
                {...register("name")}
                disabled={isPending}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                {t.patients.email} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t.patients.email}
                {...register("email")}
                disabled={isPending}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">
                {t.patients.phone} <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t.patients.phone}
                {...register("phone")}
                disabled={isPending}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label>{t.patients.dateOfBirth}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateOfBirth && "text-muted-foreground"
                    )}
                    disabled={isPending}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfBirth
                      ? formatDateByLanguage(dateOfBirth, language, "full")
                      : t.profile.pickDate}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth || undefined}
                    onSelect={(date) => setValue("dateOfBirth", date || null)}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                    fromDate={new Date(1900, 0, 1)}
                    toDate={new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.dateOfBirth && (
                <p className="text-sm text-destructive">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">{t.patients.address}</Label>
            <Input
              id="address"
              placeholder={t.profile.addressPlaceholder}
              {...register("address")}
              disabled={isPending}
            />
            {errors.address && (
              <p className="text-sm text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">{t.patients.notes}</Label>
            <Textarea
              id="notes"
              placeholder={t.profile.notesPlaceholder}
              rows={4}
              {...register("notes")}
              disabled={isPending}
            />
            {errors.notes && (
              <p className="text-sm text-destructive">{errors.notes.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              {t.common.cancel}
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="cursor-pointer"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t.profile.saveChanges}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
