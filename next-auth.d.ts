import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
  username?: string;
  image: string;
};

declare module "next-auth" {
  interface Session {
    user: {
      username?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: "ADMIN" | "USER";
    username?: string;
    image: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "USER";
    username?: string;
    image: string;
  }
}
