/**
 * API Route: Update Patient Photo URL
 *
 * Best Practices:
 * - Update database after successful S3 upload
 * - Validate ownership (user can only update their patients)
 * - Delete old photo if exists
 */

import { NextRequest, NextResponse } from "next/server";
import getSession from "@/lib/getSession";
import prisma from "@/lib/prisma";
import { deleteFile, getPublicUrl } from "@/lib/aws/s3-utils";
import { z } from "zod";

const updatePhotoSchema = z.object({
  key: z.string().min(1, "S3 key is required"),
});

/**
 * PATCH /api/patients/[id]/photo
 *
 * Called after successful upload to S3
 * Updates database with new photo URL
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate
    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate request
    const body = await request.json();
    const validation = updatePhotoSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request", details: validation.error.message },
        { status: 400 }
      );
    }

    const { key } = validation.data;
    const { id: patientId } = await params;

    // Verify patient belongs to user
    const patient = await prisma.patient.findFirst({
      where: {
        id: patientId,
        userId: session.user.id,
      },
      select: {
        id: true,
        photoUrl: true,
      },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    // Delete old photo if exists
    if (patient.photoUrl) {
      try {
        // Extract key from URL
        const oldKey = patient.photoUrl.split(".com/")[1];
        if (oldKey) {
          await deleteFile(oldKey);
        }
      } catch (error) {
        console.error("Error deleting old photo:", error);
        // Continue even if deletion fails
      }
    }

    // Update patient with new photo URL
    const publicUrl = getPublicUrl(key);

    const updatedPatient = await prisma.patient.update({
      where: { id: patientId },
      data: { photoUrl: publicUrl },
      select: {
        id: true,
        name: true,
        photoUrl: true,
      },
    });

    return NextResponse.json({
      success: true,
      patient: updatedPatient,
    });
  } catch (error) {
    console.error("Error updating patient photo:", error);

    return NextResponse.json(
      { error: "Failed to update patient photo" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/patients/[id]/photo
 *
 * Remove patient photo
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: patientId } = await params;

    // Verify patient belongs to user
    const patient = await prisma.patient.findFirst({
      where: {
        id: patientId,
        userId: session.user.id,
      },
      select: {
        id: true,
        photoUrl: true,
      },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    if (!patient.photoUrl) {
      return NextResponse.json(
        { error: "Patient has no photo" },
        { status: 400 }
      );
    }

    // Delete from S3
    try {
      const key = patient.photoUrl.split(".com/")[1];
      if (key) {
        await deleteFile(key);
      }
    } catch (error) {
      console.error("Error deleting photo from S3:", error);
    }

    // Update database
    await prisma.patient.update({
      where: { id: patientId },
      data: { photoUrl: null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting patient photo:", error);

    return NextResponse.json(
      { error: "Failed to delete patient photo" },
      { status: 500 }
    );
  }
}
