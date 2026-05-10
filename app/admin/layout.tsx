import React from 'react';
import Link from 'next/link';
import { Settings, FolderKanban, FileText, Image as ImageIcon, Music, Home, LogOut, Users } from 'lucide-react';
import { auth } from '@/server/auth/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/server/config/prisma.config';
import AdminSidebar from '@/components/admin/AdminSidebar';
import QuickAddFAB from '@/components/admin/QuickAddFAB';

export const metadata = {
  title: 'Admin Dashboard',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  console.log('session:', session);
  if (!session?.user) {
    redirect('/login');
  }

  // Double check if the user is an admin from DB to be completely secure
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { role: true, name: true, image: true, discordId: true, avatarDecoration: true }
  });
  console.log('user:', user);
  if (user?.role !== 'ADMIN') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-black text-foreground flex">
      {/* Sidebar */}
      <AdminSidebar user={user} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-12 bg-gradient-to-b from-primary/5 to-transparent relative">
        <div className="max-w-5xl mx-auto relative z-10">
          {children}
        </div>
      </main>

      {/* Floating Quick Add */}
      <QuickAddFAB />
    </div>
  );
}
