import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { createNotification } from "@features/notifications/actions";

import { prisma } from "@/lib/prisma";

// @ts-expect-error - NextAuth v5 beta types are broken
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    verifyRequest: "/provjeri-email",
    error: "/prijava-error",
  },
  events: {
    async createUser({ user }: { user: any }) {
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            image:
              "https://jrgxq33rwp.ufs.sh/f/BNaNzrQS3KNeOIpQ9sfX6YjFCOQ0PUb84RtzAZJkh3B95pvN",
          },
        });
      } catch (error) {
        console.log("CREATE_USER_ERROR:", error);
      }
    },
  },
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user: any;
      trigger: string;
      session: any;
    }) {
      if (trigger === "update") {
        if (session?.username) token.username = session.username;
        if (session?.onboarding !== undefined)
          token.onboarding = session.onboarding;
      }
      if (user) {
        token.username = (user as any).username;
        token.role = user.role;
        token.id = user.id;
        token.onboarding = user.onboarding;
        token.picture =
          "https://jrgxq33rwp.ufs.sh/f/BNaNzrQS3KNeOIpQ9sfX6YjFCOQ0PUb84RtzAZJkh3B95pvN";
        return token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.image = token.picture;
      session.user.name = token.name;
      session.user.role = token.role;
      session.user.onboarding = token.onboarding as boolean;
      return session;
    },
  },
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    GitHub({ allowDangerousEmailAccountLinking: true }),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "onboarding@resend.dev",

      async sendVerificationRequest({ identifier, url }) {
        if (process.env.NODE_ENV === "development") {
          console.log("\n--- MAGIC LINK TEST ---");
          console.log(`Email: ${identifier}`);
          console.log(`URL: ${url}`);
          console.log("-----------------------\n");
          return; // Ovo sprječava slanje pravog maila preko Resenda dok si na localhostu
        }
      },
    }),
  ],
});
