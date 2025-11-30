import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/utils/stripe";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 }
    );
  }

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_SECRET_WEBHOOK_KEY as string
  );

  switch (event.type) {
    case "customer.subscription.deleted":
      const payment = event.data.object as Stripe.Subscription;
      console.log("Subscription deleted", payment);
      break;
    case "customer.subscription.updated":
      const paymentIntent = event.data.object as Stripe.Subscription;
      console.log("Subscription updated", paymentIntent);
      break;
    case "checkout.session.completed":
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      console.log("Checkout session completed", checkoutSession);
      break;

    default:
      return NextResponse.json({ error: "Unhandled event" }, { status: 200 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
