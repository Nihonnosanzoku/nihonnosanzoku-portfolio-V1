import type { NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authConfig = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      // On initial sign-in, user is available from the signIn callback
      if (user) {
        token.role = (user as any).role;
        token.id = (user as any).id;
        token.discordId = (user as any).discordId;
      }

      // Safeguard for the main admin using environment variables
      const adminDiscordId = process.env.ADMIN_DISCORD_ID?.replace(/['"]/g, '');
      if (token.discordId === adminDiscordId) {
        token.role = 'ADMIN';
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.discordId = token.discordId;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user as any;
      const isLoggedIn = !!user;
      
      const adminDiscordId = process.env.ADMIN_DISCORD_ID?.replace(/['"]/g, '');
      const isMainAdmin = user?.discordId && user.discordId === adminDiscordId;
      const isAdminByRole = user?.role === 'ADMIN';
      
      const isAdmin = isAdminByRole || isMainAdmin;
      
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnLogin = nextUrl.pathname === '/login';

      if (isOnAdmin) {
        if (isLoggedIn && isAdmin) return true;
        
        if (isLoggedIn && !isAdmin) {
          console.warn(`[Middleware] Non-admin redirecting away from /admin: ${user?.email}`);
          return Response.redirect(new URL('/', nextUrl));
        }
        
        return false; // Redirect to login
      }
      
      if (isOnLogin && isLoggedIn) {
        const redirectUrl = isAdmin ? '/admin' : '/';
        return Response.redirect(new URL(redirectUrl, nextUrl));
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login" 
  }
} satisfies NextAuthConfig;

