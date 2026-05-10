import React from 'react';
import { prisma } from '@/server/config/prisma.config';
import { Image as ImageIcon } from 'lucide-react';
import { Metadata } from 'next';
import { auth } from '@/server/auth/auth';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Galeri | Nihonnosanzoku',
  description: 'Görsel hatıralar ve dijital tasarımlar.',
};

export const revalidate = 60;

export default async function GalleryPage() {
  const session = await auth();
  const userEmail = session?.user?.email;
  const userSystemRole = (session?.user as any)?.role || 'USER';

  let userRoleIds: string[] = [];
  
  if (userEmail) {
    const userWithRoles = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { roles: true }
    });
    userRoleIds = userWithRoles?.roles.map(r => r.id) || [];
  }

  // Filter images:
  // 1. Admins see everything
  // 2. Others see images that have at least one of their custom roles
  // 3. (Optional) Images with NO roles could be public? Let's say images with NO roles are only for Admins.
  
  const where = userSystemRole === 'ADMIN' ? {} : {
    allowedRoles: {
      some: {
        id: { in: userRoleIds }
      }
    }
  };

  const dbImages = await prisma.gallery.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { allowedRoles: true }
  });

  // Placeholder images if gallery is empty
  const images = dbImages.length > 0 ? dbImages.map(img => ({
    id: img.id,
    url: img.url,
    alt: img.alt,
    role: img.allowedRoles.length > 0 ? 'PRIVATE' : 'PUBLIC' // For UI indicator
  })) : [
    { id: '1', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600', alt: 'Retro Tech', role: 'PUBLIC' },
    { id: '2', url: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=600', alt: 'Space', role: 'PUBLIC' },
  ];

  return (
    <div className="min-h-screen bg-black text-foreground relative p-4 md:p-12 overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-black to-black opacity-80 pointer-events-none"></div>
      
      <main className="relative z-10 w-full max-w-6xl mt-12 flex flex-col gap-8">
        <div className="flex flex-col gap-2 mb-8 items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4 border border-white/20 shadow-lg group">
            <ImageIcon className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Galeri</h1>
          <p className="text-white/50 text-lg">Görsel hatıralar ve dijital tasarımlar.</p>
        </div>

        <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-6 md:p-10 backdrop-blur-2xl shadow-2xl">
           <GalleryClient images={images as any} />
        </div>
      </main>
    </div>
  );
}
