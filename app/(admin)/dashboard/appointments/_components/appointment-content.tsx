"use client";

import { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Plus,
  Clock,
  Search,
  MoreHorizontal,
  CalendarIcon,
  Loader2,
  Check,
} from "lucide-react";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { getAppointmentsByDate } from "../_data-access/get-appointments-by-date";
import { getAllServices } from "../../services/_data-access/get-all-services";
import { findOrCreatePatient } from "../_data-access/find-or-create-patient";
import { createAppointment } from "../_data-access/create-appointment";
import { updateAppointmentStatus } from "../_data-access/update-appointment-status";
import {
  getStatusVariant,
  getStatusIcon,
  getStatusLabel,
} from "../_utils/appointment-helpers";
import {
  appointmentFormSchema,
  type AppointmentFormValues,
} from "../_schemas/appointment-form-schema";
import { toast } from "sonner";
import {
  AppointmentStatus,
  type AppointmentWithRelations,
} from "@/lib/types/appointment";
import type { Service } from "@/lib/types";

interface AppointmentContentProps {
  userId: string;
  initialAppointments?: AppointmentWithRelations[];
  initialServices?: Service[];
  initialDate?: Date;
  userTimeslots?: string[];
}

export default function AppointmentContent({
  userId,
  initialAppointments = [],
  initialServices = [],
  initialDate = new Date(),
  userTimeslots = [],
}: AppointmentContentProps) {
  const router = useRouter();
  const [date, setDate] = useState<Date>(initialDate);

  // Format date
  const formatDate = (date: Date) => {
    return dayjs(date).format("MMMM D, YYYY");
  };

  // Format date without year (for quick view)
  const formatDateShort = (date: Date) => {
    return dayjs(date).format("MMMM D");
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] =
    useState<AppointmentWithRelations[]>(initialAppointments);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [appointmentsForSelectedDate, setAppointmentsForSelectedDate] =
    useState<AppointmentWithRelations[]>([]);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] =
    useState<AppointmentWithRelations | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      patientName: "",
      email: "",
      phone: "",
      serviceId: "",
      appointmentDate: date,
      appointmentTime: "",
      notes: "",
    },
  });

  const appointmentDate = watch("appointmentDate");
  const appointmentTime = watch("appointmentTime");

  // Ensure client-side only rendering for dialogs
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sort timeslots to display them in order
  const timeSlots = [...userTimeslots].sort();

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [appts, svcs] = await Promise.all([
          getAppointmentsByDate({ userId, date }),
          getAllServices(userId),
        ]);
        setAppointments(appts as AppointmentWithRelations[]);
        setServices(svcs as Service[]);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [userId, date]);

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.patient?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.patient?.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const bookedTimes = appointments.map((apt) => apt.appointmentTime);

  // Show message if no timeslots are configured
  const hasTimeslots = timeSlots.length > 0;

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (isDialogOpen) {
      reset({
        patientName: "",
        email: "",
        phone: "",
        serviceId: "",
        appointmentDate: date,
        appointmentTime: "",
        notes: "",
      });
    }
  }, [isDialogOpen, date, reset]);

  // Update available timeslots when appointment date changes
  useEffect(() => {
    if (appointmentDate) {
      // Reload appointments for the selected date
      async function loadAppointmentsForDate() {
        try {
          const appts = await getAppointmentsByDate({
            userId,
            date: appointmentDate,
          });
          setAppointmentsForSelectedDate(appts as AppointmentWithRelations[]);
        } catch (error) {
          console.error("Failed to load appointments:", error);
        }
      }
      loadAppointmentsForDate();
    } else {
      setAppointmentsForSelectedDate([]);
    }
  }, [appointmentDate, userId]);

  const onSubmit = async (data: AppointmentFormValues) => {
    startTransition(async () => {
      try {
        // Find or create patient
        const patientResult = await findOrCreatePatient({
          name: data.patientName,
          email: data.email,
          phone: data.phone,
          userId,
        });

        if (!patientResult.success || !patientResult.patient) {
          throw new Error("Failed to create or find patient");
        }

        // Create appointment
        const appointmentResult = await createAppointment({
          patientId: patientResult.patient.id,
          serviceId: data.serviceId,
          appointmentDate: data.appointmentDate,
          appointmentTime: data.appointmentTime,
          notes: data.notes || undefined,
          userId,
          status: AppointmentStatus.CONFIRMED,
        });

        if (!appointmentResult.success) {
          throw new Error("Failed to create appointment");
        }

        toast.success("Appointment scheduled and confirmed successfully!");
        setIsDialogOpen(false);
        router.refresh();

        // Reload appointments for the current date
        const appts = await getAppointmentsByDate({ userId, date });
        setAppointments(appts as AppointmentWithRelations[]);
      } catch (error) {
        console.error("Failed to schedule appointment:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to schedule appointment. Please try again."
        );
      }
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !isPending) {
      reset();
    }
    setIsDialogOpen(open);
  };

  const handleConfirmAppointment = async (appointmentId: string) => {
    startTransition(async () => {
      try {
        const result = await updateAppointmentStatus({
          id: appointmentId,
          status: AppointmentStatus.CONFIRMED,
          userId,
        });

        if (!result.success) {
          throw new Error("Failed to confirm appointment");
        }

        toast.success("Appointment confirmed successfully!");
        router.refresh();

        // Reload appointments for the current date
        const appts = await getAppointmentsByDate({ userId, date });
        setAppointments(appts as AppointmentWithRelations[]);
      } catch (error) {
        console.error("Failed to confirm appointment:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to confirm appointment. Please try again."
        );
      }
    });
  };

  const handleCancelAppointment = async () => {
    if (!appointmentToCancel) return;

    startTransition(async () => {
      try {
        const result = await updateAppointmentStatus({
          id: appointmentToCancel.id,
          status: AppointmentStatus.CANCELLED,
          userId,
        });

        if (!result.success) {
          throw new Error("Failed to cancel appointment");
        }

        toast.success("Appointment cancelled successfully");
        setCancelDialogOpen(false);
        setAppointmentToCancel(null);
        router.refresh();

        // Reload appointments for the current date
        const appts = await getAppointmentsByDate({ userId, date });
        setAppointments(appts as AppointmentWithRelations[]);
      } catch (error) {
        console.error("Failed to cancel appointment:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to cancel appointment. Please try again."
        );
      }
    });
  };

  const handleCompleteAppointment = async (appointmentId: string) => {
    startTransition(async () => {
      try {
        const result = await updateAppointmentStatus({
          id: appointmentId,
          status: AppointmentStatus.COMPLETED,
          userId,
        });

        if (!result.success) {
          throw new Error("Failed to complete appointment");
        }

        toast.success("Appointment marked as completed!");
        router.refresh();

        // Reload appointments for the current date
        const appts = await getAppointmentsByDate({ userId, date });
        setAppointments(appts as AppointmentWithRelations[]);
      } catch (error) {
        console.error("Failed to complete appointment:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to complete appointment. Please try again."
        );
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Appointment Schedule
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and schedule patient appointments
          </p>
        </div>
        {isMounted && (
          <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle>Schedule New Appointment</DialogTitle>
                  <DialogDescription>
                    Fill in the details to schedule a new appointment for a
                    patient.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="patient-name">
                      Patient Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="patient-name"
                      placeholder="Enter patient name"
                      {...register("patientName")}
                    />
                    {errors.patientName && (
                      <p className="text-sm text-destructive">
                        {errors.patientName.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="patient@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="21 99999-9999"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="service">
                      Service <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={watch("serviceId")}
                      onValueChange={(value) => setValue("serviceId", value)}
                    >
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.serviceId && (
                      <p className="text-sm text-destructive">
                        {errors.serviceId.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="appointment-date">
                      Appointment Date{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="appointment-date"
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !appointmentDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {appointmentDate ? (
                            formatDate(appointmentDate)
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={appointmentDate}
                          onSelect={(date) => {
                            if (date) {
                              setValue("appointmentDate", date);
                            }
                          }}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          captionLayout="dropdown"
                          fromDate={new Date()}
                          toDate={
                            new Date(new Date().getFullYear() + 1, 11, 31)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.appointmentDate && (
                      <p className="text-sm text-destructive">
                        {errors.appointmentDate.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time-slot">
                      Time Slot <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={watch("appointmentTime")}
                      onValueChange={(value) =>
                        setValue("appointmentTime", value)
                      }
                    >
                      <SelectTrigger id="time-slot">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots
                          .filter((slot: string) => {
                            // Filter out booked times for the selected appointment date
                            if (!appointmentDate) return true;
                            const bookedTimesForDate =
                              appointmentsForSelectedDate.map(
                                (apt) => apt.appointmentTime
                              );
                            return !bookedTimesForDate.includes(slot);
                          })
                          .map((slot: string) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    {errors.appointmentTime && (
                      <p className="text-sm text-destructive">
                        {errors.appointmentTime.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any special notes or requirements"
                      rows={3}
                      {...register("notes")}
                    />
                    {errors.notes && (
                      <p className="text-sm text-destructive">
                        {errors.notes.message}
                      </p>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleOpenChange(false)}
                    disabled={isPending}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="cursor-pointer"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      <>Confirm & Schedule</>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
        {!isMounted && (
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Calendar Section */}
        <Card className="border-primary/20 !bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden p-0 flex flex-col">
          <CardHeader className="border-b border-primary/10 bg-primary/10 rounded-t-xl px-6 pt-6 pb-6">
            <CardTitle className="text-primary">Select Date</CardTitle>
            <CardDescription>
              Choose a date to view appointments
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 px-6 pb-6 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              captionLayout="dropdown"
              className="rounded-md"
            />
          </CardContent>
        </Card>

        {/* Appointments List */}
        <Card className="border-primary/20 !bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden p-0 flex flex-col">
          <CardHeader className="border-b border-primary/10 bg-primary/10 rounded-t-xl px-6 pt-6 pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-primary">
                  {formatDate(date)}
                </CardTitle>
                <CardDescription>
                  {appointments.length}{" "}
                  {appointments.length !== 1 ? "appointments" : "appointment"}{" "}
                  scheduled
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
                  <Input
                    placeholder="Search patients..."
                    className="pl-8 sm:w-[200px] bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 px-6 pb-6">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading appointments...
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery
                  ? "No appointments found matching your search"
                  : "No appointments scheduled for this date"}
              </div>
            ) : (
              <div className="rounded-md border bg-background">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Clock className="text-muted-foreground h-4 w-4" />
                            {appointment.appointmentTime}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {appointment.patient?.name}
                            </div>
                            <div className="text-muted-foreground text-xs">
                              {appointment.patient?.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {appointment.service?.name || "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(appointment.status)}>
                            {getStatusIcon(appointment.status)}
                            {appointment.status === AppointmentStatus.PENDING
                              ? "Pending"
                              : appointment.status ===
                                  AppointmentStatus.CONFIRMED
                                ? "Confirmed"
                                : appointment.status ===
                                    AppointmentStatus.CANCELLED
                                  ? "Cancelled"
                                  : appointment.status ===
                                      AppointmentStatus.COMPLETED
                                    ? "Completed"
                                    : appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {isMounted ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                {appointment.status ===
                                  AppointmentStatus.PENDING && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleConfirmAppointment(appointment.id)
                                    }
                                    disabled={isPending}
                                  >
                                    <Check className="mr-2 h-4 w-4" />
                                    Confirm Appointment
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Edit Appointment
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {appointment.status !==
                                  AppointmentStatus.COMPLETED && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleCompleteAppointment(appointment.id)
                                    }
                                  >
                                    Mark as Completed
                                  </DropdownMenuItem>
                                )}
                                {appointment.status !==
                                  AppointmentStatus.CANCELLED && (
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => {
                                      setAppointmentToCancel(appointment);
                                      setCancelDialogOpen(true);
                                    }}
                                  >
                                    Cancel Appointment
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ) : (
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Time Slots Overview */}
      <Card className="border-primary/20 !bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden p-0 flex flex-col">
        <CardHeader className="border-b border-primary/10 bg-primary/10 rounded-t-xl px-6 pt-6 pb-6">
          <CardTitle className="text-primary">Available Time Slots</CardTitle>
          <CardDescription>
            {hasTimeslots
              ? `Quick view of available and booked time slots for ${formatDateShort(date)}`
              : "Configure your available times in your profile to start accepting appointments"}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 px-6 pb-6">
          {!hasTimeslots ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-sm text-muted-foreground mb-4">
                No available time slots configured
              </p>
              <p className="text-xs text-muted-foreground">
                Go to your profile to set up your clinic's available hours
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {timeSlots.map((slot) => {
                const isBooked = bookedTimes.includes(slot);
                return (
                  <Button
                    key={slot}
                    variant={isBooked ? "secondary" : "outline"}
                    className="justify-start"
                    disabled={isBooked}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {slot}
                  </Button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cancel Appointment Confirmation Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this appointment?
              {appointmentToCancel && (
                <div className="mt-4 space-y-2 text-sm">
                  <div>
                    <strong>Patient:</strong> {appointmentToCancel.patient.name}
                  </div>
                  <div>
                    <strong>Service:</strong> {appointmentToCancel.service.name}
                  </div>
                  <div>
                    <strong>Date:</strong>{" "}
                    {dayjs(appointmentToCancel.appointmentDate).format(
                      "MMMM D, YYYY"
                    )}
                  </div>
                  <div>
                    <strong>Time:</strong> {appointmentToCancel.appointmentTime}
                  </div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelAppointment}
              disabled={isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Yes, cancel appointment"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
