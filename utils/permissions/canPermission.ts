"use server";

import { auth } from "@/lib/auth";
import { PlanDetails } from "./plan-limits";
import prisma from "@/lib/prisma";
import { Plan } from "@/lib/generated/prisma/enums";
import { canCreateService } from "./canCreateService";

export type PLAN_PROP = "BASIC" | "PROFESSIONAL" | "EXPIRED" | "TRIAL";

export interface ResultPermissionProp {
  hasPermission: boolean;
  planId: PLAN_PROP;
  expired: boolean;
  plan: Plan | null;
}

interface CanPermissionProps {
  type: string;
}

export async function canPermission({
  type,
}: CanPermissionProps): Promise<ResultPermissionProp> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      hasPermission: false,
      planId: "EXPIRED",
      expired: true,
      plan: null,
    };
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: session?.user.id,
    },
  });

  switch (type) {
    case "service":
      const permission = await canCreateService(subscription, session);

      return permission;
    default:
      return {
        hasPermission: false,
        planId: "EXPIRED",
        expired: true,
        plan: null,
      };
  }
}
