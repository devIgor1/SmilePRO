"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface UpdateUserDataParams {
  name?: string;
  phone?: string;
  address?: string;
  status?: boolean;
  timezone?: string;
  timeslots?: string[];
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
        ...(data.name !== undefined && { name: data.name || null }),
        ...(data.phone !== undefined && { phone: data.phone || null }),
        ...(data.address !== undefined && { address: data.address || null }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.timezone !== undefined && { timezone: data.timezone || null }),
        ...(data.timeslots !== undefined && { timeslots: data.timeslots }),
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw new Error("Failed to update user data");
  }
}
