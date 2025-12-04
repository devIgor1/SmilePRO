"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Language } from "@/lib/i18n/translations";

export async function updateLanguage(language: Language) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        systemLanguage: language,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating language:", error);
    return {
      error: "Failed to update language",
    };
  }
}

