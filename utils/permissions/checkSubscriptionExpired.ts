"use server";

import { Session } from "next-auth";
import dayjs from "dayjs";
import { ResultPermissionProp } from "./canPermission";

const TRIAL_DAYS = 3;

export async function checkSubscriptionExpired(
  session: Session | null
): Promise<ResultPermissionProp> {
  const trialEndDate = dayjs(session?.user.createdAt).add(TRIAL_DAYS, "day");
  const isExpired = dayjs().isAfter(trialEndDate);

  if (isExpired) {
    return {
      hasPermission: false,
      planId: "EXPIRED",
      expired: true,
      plan: null,
    };
  }

  return {
    hasPermission: true,
    planId: "TRIAL",
    expired: false,
    plan: null,
  };
}
