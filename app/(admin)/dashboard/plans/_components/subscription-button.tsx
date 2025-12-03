"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createSubscription } from "../_actions/create-subscription";
import { Plan } from "@/utils/plans";
import { toast } from "sonner";
import { getStripeJs } from "@/utils/stripe-js";
import { Loader2 } from "lucide-react";

export const SubscriptionButton = ({ plan }: { plan: Plan }) => {
  const [isPending, startTransition] = useTransition();

  const handleCheckout = () => {
    startTransition(async () => {
      try {
        const { url, error } = await createSubscription(plan);

        if (error) {
          toast.error(error);
          return;
        }

        const stripe = await getStripeJs();

        if (stripe && url) {
          window.location.href = url;
        } else {
          toast.error("Failed to initialize checkout");
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        );
      }
    });
  };

  return (
    <Button
      onClick={handleCheckout}
      className="w-full cursor-pointer"
      variant={plan.buttonVariant}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Redirecting to checkout...
        </>
      ) : (
        plan.buttonText
      )}
    </Button>
  );
};
