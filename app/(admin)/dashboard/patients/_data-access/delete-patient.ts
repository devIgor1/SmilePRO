"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { deleteFile } from "@/lib/aws/s3-utils";

export async function deletePatient(patientId: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Verify patient belongs to user and get photo URL
    const existingPatient = await prisma.patient.findUnique({
      where: { id: patientId },
      select: { 
        userId: true,
        photoUrl: true,
        _count: {
          select: { appointments: true }
        }
      },
    });

    if (!existingPatient || existingPatient.userId !== userId) {
      throw new Error("Patient not found or unauthorized");
    }

    // Delete patient photo from S3 if exists
    if (existingPatient.photoUrl) {
      try {
        await deleteFile(existingPatient.photoUrl);
      } catch (error) {
        console.error("Failed to delete patient photo from S3:", error);
        // Continue with deletion even if S3 deletion fails
      }
    }

    // Delete patient (cascade will handle appointments)
    await prisma.patient.delete({
      where: { id: patientId },
    });

    revalidatePath("/dashboard/patients");

    return { 
      success: true, 
      message: `Patient deleted successfully. ${existingPatient._count.appointments} appointment(s) were also removed.`
    };
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete patient"
    );
  }
}

