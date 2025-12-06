"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { toast } from "sonner";
import {
  bookingFormSchema,
  type BookingFormValues,
} from "../_schemas/booking-form-schema";
import { createPublicBooking } from "../_data-access/create-public-booking";
import { getAvailableTimes } from "../_data-access/get-available-times";
import type { ClinicInfo } from "../_data-access/get-clinic-info";
import { getCalendarLocale } from "@/lib/utils/calendar-locale";

interface BookingFormProps {
  clinic: ClinicInfo;
}

export function BookingForm({ clinic }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loadingTimes, setLoadingTimes] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: null,
      serviceId: "",
      appointmentDate: undefined,
      appointmentTime: "",
      notes: "",
    },
  });

  const selectedDate = watch("appointmentDate");
  const selectedServiceId = watch("serviceId");

  // Load available times when date changes
  useEffect(() => {
    if (selectedDate) {
      setLoadingTimes(true);
      const dateStr = dayjs(selectedDate).format("YYYY-MM-DD");
      getAvailableTimes(clinic.id, dateStr)
        .then(setAvailableTimes)
        .catch(() => {
          toast.error("Failed to load available times");
          setAvailableTimes([]);
        })
        .finally(() => setLoadingTimes(false));
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate, clinic.id]);

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    try {
      await createPublicBooking({
        clinicId: clinic.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth || null,
        serviceId: data.serviceId,
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        notes: data.notes || null,
      });

      setIsSuccess(true);
      reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to book appointment"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-bold text-green-600">
              Consulta Agendada!
            </h3>
            <p className="text-muted-foreground">
              Sua consulta foi agendada com sucesso. Você receberá um e-mail de
              confirmação em breve.
            </p>
            <Button onClick={() => setIsSuccess(false)} className="mt-4">
              Agendar Outra Consulta
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const selectedService = clinic.services.find(
    (s) => s.id === selectedServiceId
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agendar Consulta</CardTitle>
        <CardDescription>
          Preencha suas informações para agendar uma consulta com {clinic.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Informações Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Nome Completo <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Igor Moraes"
                  {...register("name")}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  E-mail <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="igor@exemplo.com"
                  {...register("email")}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Telefone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 98765-4321"
                  {...register("phone")}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Data de Nascimento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !watch("dateOfBirth") && "text-muted-foreground"
                      )}
                      disabled={isSubmitting}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watch("dateOfBirth")
                        ? dayjs(watch("dateOfBirth"))
                            .locale("pt-br")
                            .format("DD/MM/YYYY")
                        : "Escolher uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={watch("dateOfBirth") || undefined}
                      onSelect={(date) => setValue("dateOfBirth", date || null)}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                      formatters={getCalendarLocale()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Detalhes da Consulta</h3>

            {/* Service Selection */}
            <div className="space-y-2">
              <Label htmlFor="service">
                Serviço <span className="text-destructive">*</span>
              </Label>
              <Select
                value={selectedServiceId || ""}
                onValueChange={(value) => setValue("serviceId", value)}
                disabled={isSubmitting}
                defaultValue=""
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {clinic.services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{service.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {service.duration} min - R${" "}
                          {(service.price / 100).toFixed(2)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.serviceId && (
                <p className="text-sm text-destructive">
                  {errors.serviceId.message}
                </p>
              )}
              {selectedService && (
                <p className="text-sm text-muted-foreground">
                  {selectedService.description}
                </p>
              )}
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label>
                Data <span className="text-destructive">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                    disabled={isSubmitting || !selectedServiceId}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate
                      ? dayjs(selectedDate).locale("pt-br").format("DD/MM/YYYY")
                      : "Escolher uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setValue("appointmentDate", date as Date);
                      setValue("appointmentTime", ""); // Reset time when date changes
                    }}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const maxDate = new Date(
                        new Date().getFullYear() + 1,
                        11,
                        31
                      );
                      return date < today || date > maxDate;
                    }}
                    captionLayout="dropdown"
                    startMonth={new Date()}
                    endMonth={new Date(new Date().getFullYear() + 1, 11, 31)}
                    formatters={getCalendarLocale()}
                  />
                </PopoverContent>
              </Popover>
              {errors.appointmentDate && (
                <p className="text-sm text-destructive">
                  {errors.appointmentDate.message}
                </p>
              )}
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <Label htmlFor="time">
                Horário <span className="text-destructive">*</span>
              </Label>
              {loadingTimes ? (
                <div className="flex items-center justify-center p-4 border rounded-md">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Loading available times...
                </div>
              ) : availableTimes.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={
                        watch("appointmentTime") === time
                          ? "default"
                          : "outline"
                      }
                      className="w-full"
                      onClick={() => setValue("appointmentTime", time)}
                      disabled={isSubmitting}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {time}
                    </Button>
                  ))}
                </div>
              ) : selectedDate ? (
                <p className="text-sm text-muted-foreground p-4 border rounded-md">
                  Não há horários disponíveis para esta data. Por favor,
                  selecione outra data.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground p-4 border rounded-md">
                  Por favor, selecione uma data primeiro
                </p>
              )}
              {errors.appointmentTime && (
                <p className="text-sm text-destructive">
                  {errors.appointmentTime.message}
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Observações Adicionais (Opcional)</Label>
              <Textarea
                id="notes"
                placeholder="Qualquer informação adicional..."
                rows={3}
                {...register("notes")}
                disabled={isSubmitting}
              />
              {errors.notes && (
                <p className="text-sm text-destructive">
                  {errors.notes.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Agendar Consulta
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
