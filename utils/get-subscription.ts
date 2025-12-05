"use server";

import prisma from "@/lib/prisma";

export async function getSubscription(userId: string | undefined | null) {
  if (!userId) {
    return null;
  }
  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: userId,
      },
    });
    return subscription;
  } catch (error) {
    console.error(error);
    return null;
  }
}
