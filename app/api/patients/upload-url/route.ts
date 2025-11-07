/**
 * API Route: Generate Presigned URL for Patient Photo Upload
 *
 * Best Practices:
 * - Authentication check
 * - Input validation
 * - Proper error handling
 * - Type safety
 */

import { NextRequest, NextResponse } from "next/server";
import getSession from "@/lib/getSession";
import { getUploadPresignedUrl, validateFile } from "@/lib/aws/s3-utils";
import { z } from "zod";

/**
 * Request validation schema
 *
 * Why Zod?: Type-safe runtime validation
 */
const uploadUrlSchema = z.object({
  patientId: z.string().min(1, "Patient ID is required"),
  fileName: z.string().min(1, "File name is required"),
  fileType: z
    .string()
    .regex(/^image\/(jpeg|jpg|png|webp)$/, "Invalid file type"),
  fileSize: z.number().max(5 * 1024 * 1024, "File too large (max 5MB)"),
});

/**
 * POST /api/patients/upload-url
 *
 * Flow:
 * 1. Authenticate user
 * 2. Validate request
 * 3. Generate presigned URL
 * 4. Return URL to client
 */
export async function POST(request: NextRequest) {
  try {
    // Step 1: Authentication
    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Step 2: Parse and validate request
    const body = await request.json();
    const validation = uploadUrlSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid request",
          details: validation.error.message,
        },
        { status: 400 }
      );
    }

    const { patientId, fileName, fileType, fileSize } = validation.data;

    // Step 3: Validate file (double-check on server)
    const fileValidation = validateFile({ type: fileType, size: fileSize });

    if (!fileValidation.valid) {
      return NextResponse.json(
        { error: fileValidation.error },
        { status: 400 }
      );
    }

    // Step 4: Generate presigned URL
    const { url, key } = await getUploadPresignedUrl({
      userId: session.user.id,
      patientId,
      fileName,
      fileType,
    });

    // Step 5: Return URL and key
    return NextResponse.json({
      uploadUrl: url,
      key,
      expiresIn: 300, // 5 minutes
    });
  } catch (error) {
    console.error("Error generating upload URL:", error);

    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
