"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateServiceParams {
  id: string;
  name?: string;
  description?: string | null;
  price?: number;
  duration?: number;
  isActive?: boolean;
}

export async function updateService(data: UpdateServiceParams) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const service = await prisma.service.update({
      where: {
        id: data.id,
        userId: session.user.id, // Ensure user owns the service
      },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.duration !== undefined && { duration: data.duration }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
    });

    revalidatePath("/dashboard/services");
    return { success: true, service };
  } catch (error) {
    console.error("Error updating service:", error);
    throw new Error("Failed to update service");
  }
}
