import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { JWT } from "next-auth/jwt";
import NextAuth, { Session } from "next-auth";

// @ts-expect-error - NextAuth v5 beta types are broken
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login", // Preusmjeri na tvoju stranicu
    newUser: "/register", // Ako želiš poseban page za nove korisnike
  },
  events: {
    async createUser({ user }: { user: any }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { image: "https://jrgxq33rwp.ufs.sh/f/BNaNzrQS3KNeOIpQ9sfX6YjFCOQ0PUb84RtzAZJkh3B95pvN" },
      });
    },
  },
  callbacks: {
    async jwt({ token, user, trigger, session }: { token: JWT; user: any; trigger: string; session: any }) {
      if (trigger === "update" && session?.name) {
        // Update user in session
        token.name = session.name;
      }
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.picture = "https://jrgxq33rwp.ufs.sh/f/BNaNzrQS3KNeOIpQ9sfX6YjFCOQ0PUb84RtzAZJkh3B95pvN";
        return token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id;
      session.user.role = token.role;
      delete session.user.image;
      return session;
    },
  },
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    GitHub({ allowDangerousEmailAccountLinking: true }),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "onboarding@resend.dev",
    }),
  ],
});
