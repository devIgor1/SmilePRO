import prisma from "@/lib/prisma";
import { Plan as PrismaPlanType } from "@/lib/generated/prisma/enums";
import { NextResponse } from "next/server";
import { stripe } from "./stripe";

/**
 * Delete, create, or update a subscription
 */
export async function manageSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
  deleteAction = false,
  type?: PrismaPlanType
) {
  const findUser = await prisma.user.findFirst({
    where: {
      stripe_customer_id: customerId,
    },
  });

  if (!findUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: findUser.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
    plan: type ?? "BASIC",
  };

  if (subscriptionId && deleteAction) {
    await prisma.subscription.delete({
      where: {
        id: subscriptionId,
      },
    });

    return;
  }

  if (createAction) {
    try {
      await prisma.subscription.create({
        data: subscriptionData,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to create subscription" },
        { status: 500 }
      );
    }
  } else {
    try {
      const findSubscription = await prisma.subscription.findFirst({
        where: {
          id: subscriptionId,
        },
      });

      if (!findSubscription) {
        return NextResponse.json(
          { error: "Subscription not found" },
          { status: 404 }
        );
      }

      await prisma.subscription.update({
        where: {
          id: subscriptionId,
        },
        data: {
          status: subscription.status,
          priceId: subscription.items.data[0].price.id,
        },
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to update subscription" },
        { status: 500 }
      );
    }
  }
}
