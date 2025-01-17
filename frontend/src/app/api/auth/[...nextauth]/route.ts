import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        access_token: { label: 'Access Token', type: 'text' },
      },
      async authorize(credentials) {
        if (credentials?.access_token) {
          // From Google OAuth 2.0
          const res: User = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${credentials.access_token}`,
              },
            },
          )
            .then((response) => response.json())
            .catch(() => null);
          if (!res) {
            throw new Error('Invalid Token');
          }
          res.id = res.sub as string;
          res.access_token = credentials.access_token;
          return res;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          },
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Authentication failed');
        }

        const res: User = await response.json();
        if (res) {
          return res;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // This is for newly logged in user
        token.access_token = user.access_token;
        token.username = user.username;
        token.emailVerified = user.emailVerified;
      }
      const res: User = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        },
      )
        .then((response) => response.json())
        .catch(() => null);
      if (res) {
        return token;
      } else {
        throw new Error('Invalid Token');
      }
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      session.user.emailVerified = token.emailVerified as boolean;
      session.user.username = token.username as string;
      session.access_token = token.access_token as string;
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    error: '/auth/signin?',
    signIn: '/auth/signin',
  },
});

export { handler as GET, handler as POST };
