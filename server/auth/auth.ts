import NextAuth from "next-auth";
import { authConfig } from "../config/auth.config";
import AuthRepository from './auth.repository';

const authRepository = new AuthRepository();

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile }: any) {
      if (!user.email) {
        console.error("Auth: No email in profile");
        return false;
      }
      
      const adminDiscordId = process.env.ADMIN_DISCORD_ID?.replace(/['"]/g, '');
      const discordId = profile?.id?.toString() || account?.providerAccountId?.toString();
      const isMainAdmin = !!adminDiscordId && discordId === adminDiscordId;
      
      const email = user.email.toLowerCase();
      let existingUser = await authRepository.findUserByEmail(email);
      const isAdminByRole = existingUser?.role === 'ADMIN';
      const isAdmin = isMainAdmin || isAdminByRole;
      
      console.log(`[Auth SignIn] ${email} | isMainAdmin: ${isMainAdmin} | isAdminByRole: ${isAdminByRole}`);

      const globalName = profile?.global_name || null;
      let avatarDecoration = null;
      if (profile?.avatar_decoration_data?.asset) {
        const asset = profile.avatar_decoration_data.asset;
        // Discord uses different paths for presets vs custom decorations
        // For simplicity and common cases, this is the most likely working URL:
        avatarDecoration = `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.webp`;
        // Fallback or secondary check if needed could be added here
      }

      if (isMainAdmin) {
        if (!existingUser) {
          console.log("Auth: Creating first-time admin");
          existingUser = await authRepository.createAdminUser({
            email,
            name: user.name || '',
            image: user.image || '',
            discordId: profile.id as string,
            globalName,
            avatarDecoration: avatarDecoration as string
          });
        } else {
          console.log("Auth: Ensuring existing admin status");
          await authRepository.makeAdminAndApprove(existingUser.id, profile.id as string);
        }
      }

      // Check if user is approved
      if (!isAdmin) {
        if (!existingUser) {
          console.warn(`Auth: Not Registered - ${email}`);
          return "/login?error=NotRegistered";
        }
        if (!existingUser.isApproved) {
          console.warn(`Auth: Not Approved - ${email}`);
          return "/login?error=NotApproved";
        }
      }

      if (existingUser) {
        // ATTACH DB INFO TO THE USER OBJECT
        // This is critical so the jwt callback in auth.config.ts can see it
        user.role = existingUser.role;
        user.discordId = existingUser.discordId;
        user.id = existingUser.id;

        await authRepository.updateDiscordProfile(
          existingUser.id,
          user.name || existingUser.name || '',
          user.image || existingUser.image || '',
          (profile?.id?.toString()) || (account?.providerAccountId?.toString()) || existingUser.discordId || '',
          globalName || undefined,
          avatarDecoration || undefined
        );
      }

      return true;
    },
  },
  session: { strategy: "jwt" },
  trustHost: true,
});

