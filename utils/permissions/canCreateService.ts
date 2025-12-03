"use server";

import { Subscription } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { Session } from "next-auth";
import { getPlan } from "./get-plans";
import { PLANS } from "../plans";
import { checkSubscriptionExpired } from "./checkSubscriptionExpired";
import { ResultPermissionProp } from "./canPermission";

export async function canCreateService(
  subscription: Subscription | null,
  session: Session | null
): Promise<ResultPermissionProp> {
  try {
    const serviceCount = await prisma.service.count({
      where: {
        userId: session?.user?.id,
      },
    });

    if (subscription && subscription.status === "active") {
      const plan = subscription.plan;

      const planLimits = await getPlan(plan);

      console.log("LIMITES DO SEU PLANO", planLimits);

      return {
        hasPermission:
          planLimits.maxServices === null ||
          serviceCount < planLimits.maxServices,
        planId: subscription.plan,
        expired: false,
        plan: subscription.plan,
      };
    }

    // TRIAL PERIOD

    const checkTrialPeriod = await checkSubscriptionExpired(session);
    return checkTrialPeriod;
  } catch (error) {
    return {
      hasPermission: false,
      planId: "EXPIRED",
      expired: false,
      plan: null,
    };
  }
}
