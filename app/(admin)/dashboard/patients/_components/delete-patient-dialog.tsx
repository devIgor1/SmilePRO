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
        error instanceof Error ? error.message : "Failed to delete patient"
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
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              This will permanently delete{" "}
              <span className="font-semibold text-foreground">
                {patient.name}
              </span>{" "}
              and all associated data.
            </p>
            {appointmentCount > 0 && (
              <p className="text-destructive font-medium">
                Warning: This will also delete {appointmentCount} appointment
                {appointmentCount !== 1 ? "s" : ""} associated with this
                patient.
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              This action cannot be undone.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
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
                Deleting...
              </>
            ) : (
              "Delete Patient"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

