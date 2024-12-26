import NextAuth from "next-auth"
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
        //     jwt: async ({ token, user }) => {
        //         console.log(token, "token")
        //         console.log(user, "user")
        //         if (user) {
        //             token.id = user.id;
        //         }
        //         return token;
        //     },
        async session({ session, token }) {
            session.user.id = token.sub as string;
            return session;
        }
    },

    // secret: process.env.AUTH_SECRET
})

export { handler as GET, handler as POST }