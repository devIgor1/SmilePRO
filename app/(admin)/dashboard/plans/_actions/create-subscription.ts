"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { stripe } from "@/utils/stripe";
import { Plan } from "@/utils/plans";

export async function createSubscription(plan: Plan) {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const findUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    throw new Error("User not found");
  }

  let customerId = findUser.stripe_customer_id;
  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: findUser.email ?? "",
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        stripe_customer_id: stripeCustomer.id,
      },
    });
    customerId = stripeCustomer.id;
  }

  try {
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        {
          price:
            plan.type === "BASIC"
              ? process.env.STRIPE_PLAN_BASIC
              : process.env.STRIPE_PLAN_PROFESSIONAL,
          quantity: 1,
        },
      ],
      metadata: {
        type: plan.type,
      },
      mode: "subscription",
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return {
      sessionId: stripeCheckoutSession.id,
      url: stripeCheckoutSession.url,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to create checkout session",
    };
  }
}
