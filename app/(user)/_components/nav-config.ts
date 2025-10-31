export const navItems = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
] as const;

export const authButtons = {
  signIn: {
    label: "Sign In",
    href: "/dashboard",
    variant: "ghost" as const,
  },
  getStarted: {
    label: "Get Started",
    href: "/dashboard",
    variant: "default" as const,
  },
  professionals: {
    label: "Proffessionals",
    href: "/professionals",
    variant: "ghost" as const,
  },
} as const;

