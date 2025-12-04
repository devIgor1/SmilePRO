import getSession from "@/lib/getSession";
import { checkSubscriptionExpired } from "@/utils/permissions/checkSubscriptionExpired";
import { getSubscription } from "@/utils/get-subscription";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import { getTranslations } from "@/lib/i18n/server";

export async function TrialBanner() {
  const session = await getSession();
  const t = await getTranslations();

  if (!session) {
    return null;
  }

  // Check if user has active subscription
  const subscription = await getSubscription(session.user.id);
  const hasActiveSubscription = subscription?.status === "active";

  // If user has active subscription, don't show trial banner
  if (hasActiveSubscription) {
    return null;
  }

  // Check if user is on trial
  const trialCheck = await checkSubscriptionExpired(session);
  const isOnTrial = trialCheck.planId === "TRIAL";

  // If not on trial, don't show banner
  if (!isOnTrial) {
    return null;
  }

  // Calculate days remaining
  const TRIAL_DAYS = 3;
  const trialEndDate = dayjs(session.user.createdAt)
    .add(TRIAL_DAYS, "day")
    .startOf("day");
  const today = dayjs().startOf("day");
  const daysRemaining = Math.max(0, trialEndDate.diff(today, "day"));

  return (
    <Card className="border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 shadow-sm">
      <CardContent className="pt-4 pb-4 px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 mt-0.5">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground mb-1">
                {daysRemaining > 0
                  ? `${t.dashboard.trial.onTrial} ${daysRemaining} ${daysRemaining !== 1 ? t.dashboard.trial.days : t.dashboard.trial.day} ${t.dashboard.trial.daysRemaining}`
                  : t.dashboard.trial.trialEnded}
              </h3>
              <p className="text-sm text-muted-foreground">
                {daysRemaining > 0
                  ? t.dashboard.trial.enjoyAccess
                  : t.dashboard.trial.upgradeContinue}
              </p>
            </div>
          </div>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer shrink-0"
            size="sm"
          >
            <Link href="/dashboard/plans">
              {t.dashboard.trial.upgradeNow}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

