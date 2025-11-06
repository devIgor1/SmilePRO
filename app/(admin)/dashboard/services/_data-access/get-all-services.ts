"use server";

import prisma from "@/lib/prisma";

export async function getAllServices(userId: string) {
  try {
    if (!userId) {
      throw new Error("User ID is required to get all services");
    }

    const services = await prisma.service.findMany({
      where: {
        userId,
        isActive: true,
      },
    });
    return services;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get all services");
  }
}
