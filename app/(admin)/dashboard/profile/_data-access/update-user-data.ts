"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface UpdateUserDataParams {
  name?: string;
  phone?: string;
  address?: string;
}

export async function updateUserData(data: UpdateUserDataParams) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.address !== undefined && { address: data.address }),
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw new Error("Failed to update user data");
  }
}
