import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User{
    userData: {
      name: string;
      email: string;
      role: string;
    };
    tokenData: string;
  }

  interface Session {
    user:User['userdata']
  }
}
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT{
    user:User['userdata']
  }
}
