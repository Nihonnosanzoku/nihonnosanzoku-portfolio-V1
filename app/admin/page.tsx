import React from 'react';
import { prisma } from '@/server/config/prisma.config';
import StatCards from '@/components/dashboard/StatCards';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { auth } from '@/server/auth/auth';
import { redirect } from 'next/navigation';

import { Home, Settings, FileText, FolderKanban, Image as ImageIcon, Music, Users } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/login');

  // Fetch counts
  const [usersCount, postsCount, techCount, galleryCount] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.techStack.count(),
    prisma.gallery.count(),
  ]);

  const stats = {
    users: usersCount,
    posts: postsCount,
    tech: techCount,
    gallery: galleryCount,
  };

  // Fetch recent activities (e.g. latest 3 posts)
  const recentPosts = await prisma.post.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, createdAt: true },
  });

  const recentUsers = await prisma.user.findMany({
    take: 2,
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, createdAt: true },
  });

  const activities = [
    ...recentPosts.map(p => ({
      id: `post-${p.id}`,
      type: 'post' as const,
      description: `Yeni yazı eklendi: ${p.title}`,
      date: p.createdAt.toISOString()
    })),
    ...recentUsers.map(u => ({
      id: `user-${u.id}`,
      type: 'user' as const,
      description: `Yeni kullanıcı katıldı: ${u.name || 'İsimsiz'}`,
      date: u.createdAt.toISOString()
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  const dashNav = [
    { name: 'Blog', href: '/admin/blog', icon: <FileText className="w-4 h-4" /> },
    { name: 'Yetenekler', href: '/admin/tech', icon: <FolderKanban className="w-4 h-4" /> },
    { name: 'Galeri', href: '/admin/gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { name: 'Müzik', href: '/admin/music', icon: <Music className="w-4 h-4" /> },
    { name: 'Kullanıcılar', href: '/admin/users', icon: <Users className="w-4 h-4" /> },
    { name: 'Ayarlar', href: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-white">Dashboard Özeti</h1>
        
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar">
          {dashNav.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all whitespace-nowrap"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      
      <StatCards stats={stats} />
      <RecentActivity activities={activities} />
      
    </div>
  );
}
