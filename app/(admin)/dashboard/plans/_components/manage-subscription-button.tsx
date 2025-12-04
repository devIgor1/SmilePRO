"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createPortalSession } from "../_actions/create-portal-session";
import { toast } from "sonner";
import { Loader2, Settings } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

export function ManageSubscriptionButton() {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();

  const handleManageSubscription = () => {
    startTransition(async () => {
      try {
        const { sessionId, error } = await createPortalSession();

        if (error) {
          toast.error(error);
          return;
        }

        if (sessionId) {
          window.location.href = sessionId;
        } else {
          toast.error("Failed to create portal session");
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
      onClick={handleManageSubscription}
      variant="default"
      className="w-full cursor-pointer"
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t.common.loading}
        </>
      ) : (
        <>
          <Settings className="mr-2 h-4 w-4" />
          {t.profile.manageSubscription}
        </>
      )}
    </Button>
  );
}
