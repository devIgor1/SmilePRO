"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface UserData {
  userId: string;
}

export async function getUserData({ userId }: UserData) {
  try {
    if (!userId) {
      throw new Error("User ID is required to get user data");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user data");
  }
}
