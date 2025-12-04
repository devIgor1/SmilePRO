import NextAuth from "next-auth";
import prisma from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  trustHost: true,
  providers: [Google],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        // Fetch user with systemLanguage from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { systemLanguage: true },
        });

        // Ensure systemLanguage is set, default to "en" if null or undefined
        const userLanguage = dbUser?.systemLanguage;
        session.user.systemLanguage =
          userLanguage === "pt-BR" || userLanguage === "en"
            ? userLanguage
            : "en";
      }
      return session;
    },
  },
});
