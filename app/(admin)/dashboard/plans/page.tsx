import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { GridPlans } from "./_components/grid-plans";
import { ActiveSubscription } from "./_components/active-subscription";
import { getSubscription } from "@/utils/get-subscription";

export default async function Plans() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  const subscription = await getSubscription(session.user.id);

  return (
    <div>
      {subscription?.status !== "active" && <GridPlans />}

      {subscription?.status === "active" && subscription && (
        <ActiveSubscription
          plan={subscription.plan}
          createdAt={subscription.createdAt}
        />
      )}
    </div>
  );
}
