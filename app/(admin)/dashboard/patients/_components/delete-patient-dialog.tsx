"use client";

import { useState } from "react";
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
import { toast } from "sonner";
import { deletePatient } from "../_data-access/delete-patient";
import type { PatientWithRelations } from "@/lib/types";
import { Loader2 } from "lucide-react";

interface DeletePatientDialogProps {
  patient: PatientWithRelations | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function DeletePatientDialog({
  patient,
  open,
  onOpenChange,
  onSuccess,
}: DeletePatientDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!patient) return;

    setIsDeleting(true);
    try {
      const result = await deletePatient(patient.id);
      toast.success(result.message);
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Falha ao excluir paciente"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (!patient) return null;

  const appointmentCount = patient.appointments?.length || 0;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Paciente</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Isso excluirá permanentemente {patient.name} e todos os dados
              associados.
            </p>
            {appointmentCount > 0 && (
              <p className="text-destructive font-medium">
                Aviso: Isso também excluirá {appointmentCount}{" "}
                {appointmentCount !== 1 ? "agendamentos" : "agendamento"}{" "}
                associado{appointmentCount !== 1 ? "s" : ""} a este paciente.
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Esta ação não pode ser desfeita.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Excluindo...
              </>
            ) : (
              "Excluir Paciente"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
