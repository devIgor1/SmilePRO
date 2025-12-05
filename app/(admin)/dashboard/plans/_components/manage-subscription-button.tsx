"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { createPortalSession } from "../_actions/create-portal-session";
import { toast } from "sonner";
import { Loader2, Settings } from "lucide-react";

export function ManageSubscriptionButton() {
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
          toast.error("Falha ao criar sessão do portal");
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Ocorreu um erro inesperado"
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
          Carregando...
        </>
      ) : (
        <>
          <Settings className="mr-2 h-4 w-4" />
          Gerenciar Assinatura
        </>
      )}
    </Button>
  );
}
