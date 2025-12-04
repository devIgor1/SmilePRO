export const navItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Professionals", href: "#professionals" },
] as const;

export const authButtons = {
  signIn: {
    label: "Sign In",
    href: "/dashboard/appointments",
    variant: "ghost" as const,
  },
  getStarted: {
    label: "Get Started",
    href: "/dashboard/appointments",
    variant: "default" as const,
  },
  professionals: {
    label: "Professionals",
    href: "/professionals",
    variant: "ghost" as const,
  },
} as const;

