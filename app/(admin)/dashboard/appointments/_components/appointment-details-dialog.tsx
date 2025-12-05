"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Calendar, Clock, FileText, User } from "lucide-react";
import dayjs from "dayjs";
import type { AppointmentWithRelations } from "@/lib/types/appointment";
import { formatDateByLanguage } from "@/lib/utils/date-formatter";
import { getStatusVariant, getStatusIcon } from "../_utils/appointment-helpers";

interface AppointmentDetailsDialogProps {
  appointment: AppointmentWithRelations;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
}

export function AppointmentDetailsDialog({
  appointment,
  open,
  onOpenChange,
  onEdit,
}: AppointmentDetailsDialogProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Detalhes do Agendamento
          </DialogTitle>
          <DialogDescription>
            {formatDateByLanguage(
              appointment.appointmentDate,
              undefined,
              "full"
            )}{" "}
            às {appointment.appointmentTime}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Patient Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Paciente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Nome</p>
                  <p className="text-sm font-medium">
                    {appointment.patient?.name || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">E-mail</p>
                  <p className="text-sm font-medium truncate">
                    {appointment.patient?.email || "N/A"}
                  </p>
                </div>
              </div>

              {appointment.patient?.phone && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Telefone</p>
                    <p className="text-sm font-medium">
                      {appointment.patient.phone}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Appointment Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Informações do Agendamento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Data do Agendamento
                  </p>
                  <p className="text-sm font-medium">
                    {formatDateByLanguage(
                      appointment.appointmentDate,
                      undefined,
                      "full"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Horário do Agendamento
                  </p>
                  <p className="text-sm font-medium">
                    {appointment.appointmentTime}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Serviços</p>
                  <p className="text-sm font-medium">
                    {appointment.service?.name || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge variant={getStatusVariant(appointment.status)}>
                    {getStatusIcon(appointment.status)}
                    {appointment.status === "PENDING"
                      ? "Pendente"
                      : appointment.status === "CONFIRMED"
                        ? "Confirmado"
                        : appointment.status === "CANCELLED"
                          ? "Cancelado"
                          : appointment.status === "COMPLETED"
                            ? "Concluído"
                            : appointment.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {appointment.notes && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Observações
                </h3>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm whitespace-pre-wrap">
                    {appointment.notes}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Created/Updated Info */}
          <Separator />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Criado:{" "}
              {formatDateByLanguage(appointment.createdAt, undefined, "full")}
            </span>
            <span>
              Última atualização:{" "}
              {formatDateByLanguage(appointment.updatedAt, undefined, "full")}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          {onEdit && <Button onClick={onEdit}>Editar</Button>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
