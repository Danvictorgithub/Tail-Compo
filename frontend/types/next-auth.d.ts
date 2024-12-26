// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            id: string;
            email: string;
            image: string;
        }
        access_token: string;
    }
    // interface JWT {
    //     access?: string;
    //     refresh?: string;
    //     exp?: number;
    //     error?: string;
    //     user?: User;
    // }
    interface User {
        email: string;
        id: string;
        sub?: string;
        image: string;
        access_token: string;
        // error?: string
    }
}