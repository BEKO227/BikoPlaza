import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode"

export const NEXTOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        const data = await res.json()
        console.log("data", data)

        if (data.message === "success") {
          const decodedToken: { id: string } = jwtDecode(data.token)

          return {
            id: decodedToken.id,
            userData: data.user,
            tokenData: data.token,
          }
        } else {
          throw new Error(data.message)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // user is only defined on initial login
      if (user) {
        token.user = user.userData
        token.token = user.tokenData
      }
      return token
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as typeof session.user
      }
      if (token.token) {
        // @ts-expect-error extend Session type in next-auth.d.ts
        session.token = token.token
      }
      return session
    },
  },
}

const handler = NextAuth(NEXTOptions)

export { handler as GET, handler as POST }
