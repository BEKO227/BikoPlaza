'use server'
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    const TokenSession = (process.env.NODE_ENV == "production"?'__Secure-next-auth.session-token':"next-auth.session-token")
    const cookiesData = await cookies();
    const encryptedToken = cookiesData.get(TokenSession)?.value
    const data = await decode({ token:encryptedToken , secret :process.env.NEXTAUTH_SECRET! })
    return data?.token
}