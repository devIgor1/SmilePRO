export const PLANS_LIMITS = {
  BASIC: {
    maxServices: 3,
  },
  PROFESSIONAL: {
    maxServices: 40,
  },
} as const;

export interface PlanDetails {
  maxServices: number;
}
