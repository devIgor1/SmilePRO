import { DefaultSession } from "next-auth";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: null | string | boolean;
  image: string;
  stripe_customer_id?: string;
  times: string[];
  address?: string;
  phone?: string;
  status: boolean;
  systemLanguage?: string;
  createdAt: string;
  updatedAt: string;
}

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}
