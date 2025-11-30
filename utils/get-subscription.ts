"use server";

import prisma from "@/lib/prisma";

export async function getSubscription(userId: string) {
  if (!userId) {
    throw new Error("User ID is required to get subscriptions");
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
