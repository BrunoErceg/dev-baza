import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"; // NOVA PUTANJA
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg"; // MORAŠ DODATI OVO

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
      httpOptions: {
        timeout: 15000, // Povećaj na 10 sekundi
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
      httpOptions: {
        timeout: 15000, // Povećaj na 10 sekundi
      },
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT as number | undefined,

        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        secure: false,
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: PrismaAdapter(prisma),
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
