import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch(
            "https://akil-backend.onrender.com/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

                  if (response.ok && data.success) {
          console.log("Authentication successful:", data);
          return {
            id: data.data?.id || "1",
            name: data.data?.name || credentials.email,
            email: credentials.email,
            accessToken: data.data?.accessToken,
          };
        }

          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback - User:", user);
      console.log("JWT callback - Token:", token);
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback - Token:", token);
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.id || token.sub || "1";
        session.user.name = token.name;
        session.user.email = token.email;
      }
      console.log("Session callback - Final session:", session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});

export { handler as GET, handler as POST };
