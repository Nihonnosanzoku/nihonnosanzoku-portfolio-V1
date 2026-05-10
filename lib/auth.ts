export const runtime = "nodejs";

import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import prisma from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const existingUser = await prisma.user.findFirst({
        where: { email: user.email }
      });

      if (!existingUser || !existingUser.isApproved) {
        return false;
      }

      return true;
    },

    async session({ session, token }) {
      if (session.user && token.sub) {
        const dbUser = await prisma.user.findFirst({
          where: { email: session.user.email ?? "" }
        });

        if (dbUser) {
          (session.user as any).role = dbUser.role;
          (session.user as any).id = dbUser.id;
        }
      }

      return session;
    }
  },

  pages: {
    signIn: "/",
    error: "/"
  }
});