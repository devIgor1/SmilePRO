"use server";

import { Session } from "next-auth";
import { getSubscription } from "@/utils/get-subscription";
import { checkSubscriptionExpired } from "./checkSubscriptionExpired";

export interface AccessStatus {
  hasAccess: boolean;
  hasActiveSubscription: boolean;
  isOnTrial: boolean;
}

/**
 * Checks if a user has access to premium features.
 * User has access if they have an active subscription OR are on trial.
 *
 * @param session - The user session
 * @returns AccessStatus object with access information
 */
export async function hasAccess(
  session: Session | null
): Promise<AccessStatus> {
  if (!session?.user?.id) {
    return {
      hasAccess: false,
      hasActiveSubscription: false,
      isOnTrial: false,
    };
  }

  // Check if user has active subscription
  const subscription = await getSubscription(session.user.id);
  const hasActiveSubscription = subscription?.status === "active";

  // If no active subscription, check if user is on trial
  let isOnTrial = false;
  if (!hasActiveSubscription) {
    const trialCheck = await checkSubscriptionExpired(session);
    isOnTrial = trialCheck.planId === "TRIAL";
  }

  return {
    hasAccess: hasActiveSubscription || isOnTrial,
    hasActiveSubscription,
    isOnTrial,
  };
}
