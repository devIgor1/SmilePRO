"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Clock,
  X,
} from "lucide-react";
import dayjs from "dayjs";
import type { PatientWithRelations } from "@/lib/types";
import { getInitials } from "../_utils/patient-helpers";
import {
  getStatusVariant,
  getStatusIcon,
  getStatusLabel,
} from "../../appointments/_utils/appointment-helpers";

interface PatientDetailsDialogProps {
  patient: PatientWithRelations;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
}

export function PatientDetailsDialog({
  patient,
  open,
  onOpenChange,
  onEdit,
}: PatientDetailsDialogProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const calculateAge = (dateOfBirth: Date | null) => {
    if (!dateOfBirth) return null;
    return dayjs().diff(dayjs(dateOfBirth), "year");
  };

  const age = calculateAge(patient.dateOfBirth);
  const appointmentCount = patient.appointments?.length || 0;
  const upcomingAppointments = patient.appointments?.filter((apt) =>
    dayjs(apt.appointmentDate).isAfter(dayjs(), "day")
  );
  const pastAppointments = patient.appointments?.filter((apt) =>
    dayjs(apt.appointmentDate).isBefore(dayjs(), "day")
  );

  if (!isMounted) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={patient.photoUrl || undefined} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {getInitials(patient.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl">{patient.name}</DialogTitle>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium truncate">
                    {patient.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{patient.phone}</p>
                </div>
              </div>

              {/* Date of Birth */}
              {patient.dateOfBirth && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">
                      Date of Birth
                    </p>
                    <p className="text-sm font-medium">
                      {dayjs(patient.dateOfBirth).format("MMMM D, YYYY")}
                      {age && (
                        <span className="text-muted-foreground ml-2">
                          ({age} years old)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              )}

              {/* Address */}
              {patient.address && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm font-medium">{patient.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Notes */}
          {patient.notes && (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Notes
                </h3>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm whitespace-pre-wrap">{patient.notes}</p>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Appointment Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Appointment Summary
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-2xl font-bold text-primary">
                  {appointmentCount}
                </p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {upcomingAppointments?.length || 0}
                </p>
                <p className="text-xs text-muted-foreground">Upcoming</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-2xl font-bold text-green-600">
                  {pastAppointments?.length || 0}
                </p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </div>

          {/* Recent Appointments */}
          {patient.appointments && patient.appointments.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Recent Appointments
                </h3>
                <div className="space-y-2">
                  {patient.appointments
                    .sort(
                      (a, b) =>
                        new Date(b.appointmentDate).getTime() -
                        new Date(a.appointmentDate).getTime()
                    )
                    .slice(0, 5)
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">
                              {dayjs(appointment.appointmentDate).format(
                                "MMM D, YYYY"
                              )}{" "}
                              at {appointment.appointmentTime}
                            </p>
                            {appointment.service && (
                              <p className="text-xs text-muted-foreground">
                                {appointment.service.name}
                              </p>
                            )}
                          </div>
                        </div>
                        <Badge variant={getStatusVariant(appointment.status)}>
                          {getStatusIcon(appointment.status)}
                          {getStatusLabel(appointment.status)}
                        </Badge>
                      </div>
                    ))}
                </div>
                {patient.appointments.length > 5 && (
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Showing 5 of {patient.appointments.length} appointments
                  </p>
                )}
              </div>
            </>
          )}

          {/* Patient Since */}
          <Separator />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Patient since {dayjs(patient.createdAt).format("MMMM YYYY")}
            </span>
            <span>
              Last updated {dayjs(patient.updatedAt).format("MMM D, YYYY")}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {onEdit && <Button onClick={onEdit}>Edit Patient</Button>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
