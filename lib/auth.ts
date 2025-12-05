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
      if (session.user && user) {
        // Add user id to session
        session.user.id = user.id;

        // Fetch user with systemLanguage from database
        try {
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
        } catch (error) {
          console.error("Error fetching user language:", error);
          session.user.systemLanguage = "en";
        }
      }
      return session;
    },
  },
  session: {
    strategy: "database",
  },
});
