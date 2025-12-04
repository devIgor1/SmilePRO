/**
 * S3 Utility Functions
 *
 * Best Practices:
 * - Pure functions for testability
 * - Proper error handling
 * - Security validations
 * - HIPAA compliance considerations
 */

import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client, s3Config } from "./s3-config";

/**
 * Allowed file types for patient photos
 *
 * Why restrict?: Security & storage optimization
 */
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

/**
 * Maximum file size (5MB)
 *
 * Why 5MB?: Balance between quality and storage costs
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

/**
 * Presigned URL expiration time (5 minutes)
 *
 * Why 5 minutes?: Enough time to upload, not too long for security
 */
const PRESIGNED_URL_EXPIRATION = 5 * 60; // 5 minutes in seconds

/**
 * Validate file before upload
 */
export function validateFile(file: { type: string; size: number }): {
  valid: boolean;
  error?: string;
} {
  // Check file type
  if (!ALLOWED_MIME_TYPES.includes(file.type as any)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${ALLOWED_MIME_TYPES.join(", ")}`,
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  return { valid: true };
}

/**
 * Generate a unique, secure file name
 *
 * Format: patients/{userId}/{patientId}/{timestamp}-{random}.{ext}
 *
 * Why this structure?:
 * - userId: Organize by clinic/user
 * - patientId: Easy to find patient photos
 * - timestamp: Avoid name collisions
 * - random: Additional uniqueness
 */
export function generateFileName(
  userId: string,
  patientId: string,
  originalName: string
): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split(".").pop()?.toLowerCase() || "jpg";

  return `patients/${userId}/${patientId}/${timestamp}-${randomString}.${extension}`;
}

/**
 * Get presigned URL for upload
 *
 * What is a presigned URL?:
 * A temporary URL that allows anyone to upload a file to S3
 * without needing AWS credentials. It expires after a set time.
 *
 * Security benefits:
 * - Client uploads directly to S3 (doesn't go through your server)
 * - URL expires automatically
 * - Scoped to specific file and operation
 */
export async function getUploadPresignedUrl(params: {
  userId: string;
  patientId: string;
  fileName: string;
  fileType: string;
}): Promise<{ url: string; key: string }> {
  try {
    const key = generateFileName(
      params.userId,
      params.patientId,
      params.fileName
    );

    const command = new PutObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
      ContentType: params.fileType,
    });

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: PRESIGNED_URL_EXPIRATION,
    });

    return { url, key };
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    throw new Error("Failed to generate upload URL");
  }
}

/**
 * Get public URL for a file
 *
 * Returns CloudFront URL if configured, otherwise S3 URL
 *
 * Why CloudFront?:
 * - Faster global delivery via CDN
 * - HTTPS by default
 * - Better security options
 */
export function getPublicUrl(key: string): string {
  if (s3Config.cloudFrontUrl) {
    return `${s3Config.cloudFrontUrl}/${key}`;
  }

  return `https://${s3Config.bucketName}.s3.${s3Config.region}.amazonaws.com/${key}`;
}

/**
 * Delete a file from S3
 *
 * When to use?:
 * - Patient deleted
 * - Photo replaced
 * - GDPR/data retention compliance
 */
export async function deleteFile(key: string): Promise<void> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: s3Config.bucketName,
      Key: key,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
}
