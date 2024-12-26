import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
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
                token.error = "RefreshTokenError";
                console.error("Token is invalid")
                throw new Error("Invalid Token");
                return token;
            }
        },
        async session({ session, token }) {
            session.user.id = token.sub as string
            session.access_token = token.access_token as string
            session.error = token.error as "RefreshTokenError"
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