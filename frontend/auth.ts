import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                // Demo user
                if (credentials?.email === "demo@marketing.ai" && credentials?.password === "demo123") {
                    return {
                        id: "1",
                        name: "Demo User",
                        email: "demo@marketing.ai",
                    }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
})
