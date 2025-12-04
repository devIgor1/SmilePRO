"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "./DashboardSidebar";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslations } from "@/hooks/use-translations";

function DashboardBreadcrumb() {
  const pathname = usePathname();
  const t = useTranslations();

  const pathSegments = pathname.split("/").filter(Boolean);

  // Get all segments after dashboard
  const subSegments = pathSegments.slice(1);

  // Map segment to display name
  const getSegmentName = (segment: string): string => {
    const keyMap: Record<string, string> = {
      appointments: t.nav.appointments,
      patients: t.nav.patients,
      services: t.nav.services,
      profile: t.nav.profile,
      plans: t.nav.plans,
    };
    return keyMap[segment] || segment;
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard/appointments">{t.nav.appointments}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {subSegments.length > 1 && subSegments.map((segment, index) => {
          const href =
            "/dashboard/" + subSegments.slice(0, index + 1).join("/");
          const isLast = index === subSegments.length - 2;
          const segmentName = getSegmentName(segment);

          return (
            <div key={href} className="flex items-center gap-1.5">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{segmentName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{segmentName}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background/95 backdrop-blur px-4">
          <SidebarTrigger className="-ml-1 hover:bg-accent/50" />
          <DashboardBreadcrumb />
          <div className="flex-1" />
          <LanguageSelector />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 bg-muted/20">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

