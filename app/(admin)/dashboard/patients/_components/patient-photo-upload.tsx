"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload, X, Loader2, Trash2 } from "lucide-react";
import { usePatientPhotoUpload } from "@/hooks/use-patient-photo-upload";
import { useRouter } from "next/navigation";

interface PatientPhotoUploadProps {
  patientId: string;
  patientName: string;
  currentPhotoUrl: string | null;
  initials: string;
}

export function PatientPhotoUpload({
  patientId,
  patientName,
  currentPhotoUrl,
  initials,
}: PatientPhotoUploadProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadPhoto, deletePhoto, isUploading, progress, error } =
    usePatientPhotoUpload();

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert(
        "Por favor, selecione um arquivo de imagem válido (JPEG, PNG ou WebP)"
      );
      return;
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("O arquivo é muito grande. O tamanho máximo é 5MB.");
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle upload
  const handleUpload = async () => {
    if (!selectedFile) return;

    const result = await uploadPhoto(selectedFile, patientId);

    if (result.success) {
      // Reset state
      setSelectedFile(null);
      setPreview(null);
      setIsOpen(false);

      // Refresh the page to show new photo
      router.refresh();
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!currentPhotoUrl) return;

    const confirmed = window.confirm(
      `Tem certeza que deseja excluir a foto de ${patientName}?`
    );

    if (!confirmed) return;

    const result = await deletePhoto(patientId);

    if (result.success) {
      setIsOpen(false);
      router.refresh();
    }
  };

  // Reset dialog state
  const handleOpenChange = (open: boolean) => {
    if (!open && !isUploading) {
      setSelectedFile(null);
      setPreview(null);
    }
    setIsOpen(open);
  };

  return (
    <>
      {/* Avatar with upload button overlay */}
      <div className="relative group">
        <Avatar className="h-10 w-10">
          <AvatarImage src={currentPhotoUrl || undefined} alt={patientName} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Camera button overlay */}
        <button
          onClick={() => setIsOpen(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Upload photo"
        >
          <Camera className="h-4 w-4 text-white" />
        </button>
      </div>

      {/* Upload Dialog */}
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Foto do Paciente</DialogTitle>
            <DialogDescription>
              Envie uma foto para {patientName}. Tamanho máximo: 5MB.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Preview or Current Photo */}
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src={preview || currentPhotoUrl || undefined}
                    alt={patientName}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary text-4xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                {/* Remove preview button */}
                {preview && (
                  <button
                    onClick={() => {
                      setPreview(null);
                      setSelectedFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/90"
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isUploading}
            />

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              {!selectedFile && !currentPhotoUrl && (
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                  disabled={isUploading}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Selecionar Foto
                </Button>
              )}

              {!selectedFile && currentPhotoUrl && (
                <>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full"
                    disabled={isUploading}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Alterar Foto
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="destructive"
                    className="w-full"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Excluindo...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir Foto
                      </>
                    )}
                  </Button>
                </>
              )}

              {selectedFile && (
                <>
                  <Button
                    onClick={handleUpload}
                    className="w-full"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading... {progress}%
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Photo
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => {
                      setPreview(null);
                      setSelectedFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    variant="outline"
                    className="w-full"
                    disabled={isUploading}
                  >
                    Cancelar
                  </Button>
                </>
              )}
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <p className="text-xs text-muted-foreground">
              Formatos suportados: JPEG, PNG, WebP (Máx. 5MB)
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
