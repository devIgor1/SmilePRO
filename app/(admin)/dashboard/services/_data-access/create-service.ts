"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { canCreateService } from "@/utils/permissions/canCreateService";
import { getSubscription } from "@/utils/get-subscription";

interface CreateServiceParams {
  name: string;
  description?: string;
  price: number;
  duration: number;
}

export async function createService(data: CreateServiceParams) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Check permissions before creating
  const subscription = await getSubscription(session.user.id);
  const permission = await canCreateService(subscription, session);

  if (!permission.hasPermission) {
    throw new Error(
      `You've reached the service limit for your plan. Upgrade to create more services.`
    );
  }

  try {
    const service = await prisma.service.create({
      data: {
        name: data.name,
        description: data.description || null,
        price: data.price,
        duration: data.duration,
        isActive: true,
        userId: session.user.id,
      },
    });

    revalidatePath("/dashboard/services");
    return { success: true, service };
  } catch (error) {
    console.error("Error creating service:", error);
    throw new Error("Failed to create service");
  }
}
