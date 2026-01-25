import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

// @ts-expect-error - NextAuth v5 beta types are broken
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger, session }: { token: JWT; user: any; trigger: string; session: any }) {
      if (user) {
        token.role = (user as any).role;
        return token;
      }

      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      if (!token.role && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { role: true },
        });

        if (dbUser) {
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "USER";
      }
      if (token.sub && session.user) {
        session.user.id = token.sub; // 'sub' je ID korisnika iz baze/tokena
      }
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
