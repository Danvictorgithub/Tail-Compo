import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                access_token: { label: "Access Token", type: "text" },
            },
            async authorize(credentials) {
                if (credentials?.access_token) { // From Google OAuth 2.0
                    const res: User = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${credentials.access_token}`
                        }
                    }).then(response => response.json()).catch(() => null);
                    if (!res) {
                        throw new Error("Invalid Token");
                    }
                    res.id = res.sub as string;
                    res.access_token = credentials.access_token;
                    return res;
                }

                const res: {
                    email: string,
                    id: string,
                    image: string,
                    access_token: string
                    error?: string
                } = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(credentials)
                }).then(response => response.json());
                if (res.error) {
                    throw new Error(res.error);
                }
                return res;
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) { // This is for newly logged in user
                token.access_token = user.access_token;
            }
            const res: User = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token.access_token}`
                }
            }).then(response => response.json()).catch(() => null);
            if (res) {
                return token;
            }
            else {
                throw new Error("Invalid Token");
            }
        },
        async session({ session, token }) {
            session.user.id = token.sub as string
            session.access_token = token.access_token as string
            return session;
        },
        async redirect({ baseUrl }) {
            return baseUrl
        },
    },
    pages: {
    }
})

export { handler as GET, handler as POST }