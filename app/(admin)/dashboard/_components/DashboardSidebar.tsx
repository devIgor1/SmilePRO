"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Smile,
  LayoutDashboard,
  Calendar,
  CreditCard,
  Settings,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Appointments",
    href: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    title: "Patients",
    href: "/dashboard/patients",
    icon: Users,
  },
  {
    title: "Plans",
    href: "/dashboard/plans",
    icon: CreditCard,
  },
  {
    title: "Services",
    href: "/dashboard/services",
    icon: Settings,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border bg-gradient-to-br from-primary/5 via-background to-background">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-4 transition-all hover:bg-primary/10 rounded-lg -mx-2 -my-1 cursor-pointer group"
        >
          <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-lg shadow-sm ring-1 ring-primary/20 transition-all group-hover:scale-110 group-hover:shadow-md group-hover:ring-primary/40">
            <Smile className="size-5 transition-transform group-hover:scale-110" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight transition-colors group-hover:text-primary">
              Smile PRO
            </span>
            <span className="text-primary/70 text-xs font-medium transition-colors group-hover:text-primary">
              Dashboard
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold text-sidebar-foreground/60">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className={`text-base ${isActive ? "bg-primary/10 text-primary font-medium shadow-sm ring-1 ring-primary/10" : "hover:bg-accent/50"}`}
                    >
                      <Link href={item.href}>
                        <item.icon
                          className={`size-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border bg-muted/30 px-2 py-3">
        <div className="px-2 text-xs text-muted-foreground/70">
          © 2025 Smile PRO
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
