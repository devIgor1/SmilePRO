"use server";

import { Plan } from "@/lib/generated/prisma/enums";
import { PLANS_LIMITS } from "./plan-limits";

export async function getPlan(planId: Plan) {
  return PLANS_LIMITS[planId];
}
