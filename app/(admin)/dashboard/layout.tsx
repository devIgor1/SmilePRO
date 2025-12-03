import { Suspense } from "react";
import { DashboardLayoutClient } from "./_components/dashboard-layout-client";
import { TrialBanner } from "./_components/trial-banner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayoutClient>
      <Suspense fallback={null}>
        <TrialBanner />
      </Suspense>
      {children}
    </DashboardLayoutClient>
  );
}
