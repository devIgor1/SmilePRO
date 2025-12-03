"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/utils/stripe";

export async function createPortalSession() {
  const session = await auth();

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const sessionId = user.stripe_customer_id;

  if (!sessionId) {
    throw new Error("No Stripe customer found");
  }

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: sessionId,
      return_url: process.env.STRIPE_SUCCESS_URL,
    });

    return {
      sessionId: portalSession.url,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to create portal session",
    };
  }
}
