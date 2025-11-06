"use client";

import { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Clock, Search, Filter, MoreHorizontal } from "lucide-react";
import dayjs from "dayjs";
import { Calendar } from "@/components/ui/calendar";
import { getAppointmentsByDate } from "../_data-access/get-appointments-by-date";
import { getAllServices } from "../../services/_data-access/get-all-services";
import {
  getStatusVariant,
  getStatusIcon,
  getStatusLabel,
} from "../_utils/appointment-helpers";
import type {
  AppointmentStatus,
  AppointmentWithService,
} from "@/lib/types/appointment";
import type { Service } from "@/lib/types";

interface AppointmentContentProps {
  userId: string;
  initialAppointments?: AppointmentWithService[];
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
  const [date, setDate] = useState<Date>(initialDate);
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] =
    useState<AppointmentWithService[]>(initialAppointments);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        setAppointments(appts as AppointmentWithService[]);
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
      apt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const bookedTimes = appointments.map((apt) => apt.appointmentTime);

  // Show message if no timeslots are configured
  const hasTimeslots = timeSlots.length > 0;

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>
                Fill in the details to schedule a new appointment for a patient.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="patient-name">Patient Name</Label>
                <Input id="patient-name" placeholder="Enter patient name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="patient@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="21 99999-9999" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service">Service</Label>
                <Select>
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
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time-slot">Time Slot</Label>
                <Select>
                  <SelectTrigger id="time-slot">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots
                      .filter((slot: string) => !bookedTimes.includes(slot))
                      .map((slot: string) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any special notes or requirements"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Schedule Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                  {dayjs(date).format("MMMM D, YYYY")}
                </CardTitle>
                <CardDescription>
                  {appointments.length} appointment
                  {appointments.length !== 1 ? "s" : ""} scheduled
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
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
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
                              {appointment.name}
                            </div>
                            <div className="text-muted-foreground text-xs">
                              {appointment.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {appointment.service?.name || "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(appointment.status)}>
                            {getStatusIcon(appointment.status)}
                            {getStatusLabel(appointment.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>
                                Edit Appointment
                              </DropdownMenuItem>
                              <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                Cancel Appointment
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
              ? `Quick view of available and booked time slots for ${dayjs(date).format("MMMM D")}`
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
    </div>
  );
}
``;
