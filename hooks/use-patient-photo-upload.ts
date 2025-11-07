/**
 * Custom Hook: Patient Photo Upload
 *
 * Best Practices:
 * - Encapsulate upload logic
 * - Proper error handling
 * - Loading states
 * - Progress tracking
 * - Type safety
 */

import { useState, useCallback } from "react";

interface UploadResult {
  success: boolean;
  photoUrl?: string;
  error?: string;
}

/**
 * Custom hook for patient photo upload
 *
 * Why a custom hook?:
 * - Reusable across components
 * - Encapsulates complex logic
 * - Easy to test
 * - Better separation of concerns
 */
export function usePatientPhotoUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  /**
   * Upload a patient photo
   *
   * Flow:
   * 1. Validate file on client
   * 2. Get presigned URL from API
   * 3. Upload directly to S3
   * 4. Update database with photo URL
   */
  const uploadPhoto = useCallback(
    async (file: File, patientId: string): Promise<UploadResult> => {
      try {
        // Reset state
        setIsUploading(true);
        setProgress(0);
        setError(null);

        // Step 1: Client-side validation
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!allowedTypes.includes(file.type)) {
          throw new Error(
            "Invalid file type. Please upload a JPEG, PNG, or WebP image."
          );
        }

        if (file.size > maxSize) {
          throw new Error("File too large. Maximum size is 5MB.");
        }

        setProgress(10);

        // Step 2: Get presigned URL from your API
        const urlResponse = await fetch("/api/patients/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            patientId,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
          }),
        });

        if (!urlResponse.ok) {
          const error = await urlResponse.json();
          throw new Error(error.error || "Failed to get upload URL");
        }

        const { uploadUrl, key } = await urlResponse.json();
        setProgress(30);

        // Step 3: Upload directly to S3 using presigned URL
        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file to S3");
        }

        setProgress(70);

        // Step 4: Update database with photo URL
        const updateResponse = await fetch(`/api/patients/${patientId}/photo`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key }),
        });

        if (!updateResponse.ok) {
          const error = await updateResponse.json();
          throw new Error(error.error || "Failed to update patient photo");
        }

        const { patient } = await updateResponse.json();
        setProgress(100);

        // Success!
        setIsUploading(false);
        setError(null);

        return {
          success: true,
          photoUrl: patient.photoUrl,
        };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Upload failed";

        setIsUploading(false);
        setProgress(0);
        setError(errorMessage);

        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    []
  );

  /**
   * Delete a patient photo
   */
  const deletePhoto = useCallback(
    async (patientId: string): Promise<UploadResult> => {
      try {
        setIsUploading(true);
        setProgress(0);
        setError(null);

        const response = await fetch(`/api/patients/${patientId}/photo`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to delete photo");
        }

        setIsUploading(false);
        setProgress(100);
        setError(null);

        return { success: true };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Delete failed";

        setIsUploading(false);
        setProgress(0);
        setError(errorMessage);

        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    []
  );

  return {
    isUploading,
    progress,
    error,
    uploadPhoto,
    deletePhoto,
  };
}
