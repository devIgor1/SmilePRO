// Configuração de navegação - todos os textos em português
export const navItems = [
  { label: "Recursos", href: "#features" },
  { label: "Preços", href: "#pricing" },
  { label: "Profissionais", href: "#professionals" },
] as const;

export const authButtons = {
  signIn: {
    label: "Entrar",
    href: "/dashboard/appointments",
    variant: "ghost" as const,
  },
  getStarted: {
    label: "Começar",
    href: "/dashboard/appointments",
    variant: "default" as const,
  },
  professionals: {
    label: "Profissionais",
    href: "/professionals",
    variant: "ghost" as const,
  },
} as const;
