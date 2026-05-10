import { auth } from '@/server/auth/auth';
import { Metadata } from 'next';
import Link from 'next/link';
import { LayoutDashboard, BookOpen, Network, Image as ImageIcon, Music, Download } from 'lucide-react';

import RepoService from '@/server/repo/repo.service';
import BlogService from '@/server/blog/blog.service';
import AuthRepository from '@/server/auth/auth.repository';
import SettingsRepository from '@/server/settings/settings.repository';
import TechRepository from '@/server/tech/tech.repository';

import HeroSection from '@/components/main/HeroSection';
import ConnectSection from '@/components/main/ConnectSection';
import ReposSection from '@/components/main/ReposSection';
import TechSection from '@/components/main/TechSection';
import BlogSection from '@/components/main/BlogSection';
import QuickActions from '@/components/main/QuickActions';
import { getRandomVoice } from '@/server/actions/voice.actions';
import { addGalleryItem, addBlogPost } from '@/server/actions/home.actions';
import RoleRepository from '@/server/roles/role.repository';

export const metadata: Metadata = {
  title: 'Nihonnosanzoku | Portfolio',
  description: 'Full-stack developer portfolio and personal blog.',
};

const repoService = new RepoService();
const blogService = new BlogService();
const authRepository = new AuthRepository();
const settingsRepository = new SettingsRepository();
const techRepository = new TechRepository();

export const revalidate = 0; // Disable caching for now to ensure random action works on every load

export default async function Home() {
  const session = await auth();
  const isAdmin = (session?.user as any)?.role === 'ADMIN';
  
  const adminProfile = await authRepository.getAdminProfile();
  const siteSettings = await settingsRepository.getGlobalSettings();
  const randomVoice = await getRandomVoice();
  const roleRepository = new RoleRepository();
  const roles = await roleRepository.getAllRoles();

  // Dynamic Github Username extraction
  const githubLink = siteSettings?.githubLink || "https://git hub.com/erslly";
  let githubUsername = "erslly";
  try {
    const urlParts = new URL(githubLink).pathname.split('/').filter(Boolean);
    if (urlParts.length > 0) {
      githubUsername = urlParts[urlParts.length - 1];
    }
  } catch(e) {}

  const reposData = await repoService.getGithubRepos(githubUsername);
  const postsData = await blogService.getAllPublishedPosts();

  const repos = Array.isArray(reposData) ? reposData.slice(0, 4) : [];
  const posts = postsData.slice(0, 4);

  const dbTechStack = await techRepository.getAllTech();
  const fallbackTechStack = [
    { name: 'TypeScript', iconName: 'Code2' },
    { name: 'Next.js', iconName: 'AppWindow' },
  ];
  const activeTechStack = dbTechStack.length > 0 ? dbTechStack : fallbackTechStack;

  const quickLinks = [
    { name: 'Yazılarım', href: '/blog', icon: BookOpen, color: 'text-blue-400' },
    { name: 'Projelerim', href: '/repo', icon: Network, color: 'text-purple-400' },
    { name: 'Galeri', href: '/galeri', icon: ImageIcon, color: 'text-pink-400' },
    { name: 'Müzik Kutusu', href: '/sarkilarim', icon: Music, color: 'text-green-400' },
    { name: 'Video İndirici', href: '/download', icon: Download, color: 'text-orange-400' },
  ];

  return (
    <div className="min-h-screen bg-black text-foreground selection:bg-primary/50 relative p-4 md:p-12 overflow-hidden flex flex-col items-center">

      {/* Intense animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-black to-black opacity-80 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[300px] md:w-[800px] h-[300px] md:h-[600px] bg-primary/5 blur-[80px] md:blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[200px] md:w-[600px] h-[200px] md:h-[600px] bg-purple-900/10 blur-[80px] md:blur-[150px] rounded-full pointer-events-none mix-blend-screen" />

      {isAdmin && (
        <div className="relative z-20 w-full max-w-7xl mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
          <Link 
            href="/admin" 
            className="group flex items-center justify-between p-1 pr-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-white/80 group-hover:text-white">Admin Dashboard</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 group-hover:text-primary transition-colors">Yönetim Paneline Git →</span>
          </Link>
        </div>
      )}

      <main className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 auto-rows-auto">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <HeroSection 
            adminProfile={adminProfile} 
            siteSettings={siteSettings} 
            randomVoice={randomVoice} 
          />
          
          {/* Quick Links Card */}
          <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-8 backdrop-blur-2xl shadow-2xl">
            <h3 className="text-xl font-black text-white mb-6 tracking-tighter uppercase italic">Hızlı Menü</h3>
            <div className="grid grid-cols-1 gap-3">
              {quickLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center ${link.color} group-hover:scale-110 transition-transform`}>
                    <link.icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-white/70 group-hover:text-white transition-colors">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <ConnectSection />
          
          {isAdmin && (
            <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-8 backdrop-blur-2xl shadow-2xl">
              <h3 className="text-xl font-black text-white mb-2 tracking-tighter uppercase italic">Admin Aksiyonları</h3>
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-black mb-6">Hızlı İçerik Ekle</p>
              <QuickActions 
                roles={roles} 
                addImageAction={addGalleryItem} 
                addPostAction={addBlogPost}
              />
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <ReposSection repos={repos} />
          <TechSection activeTechStack={activeTechStack} />
          <BlogSection posts={posts} />
        </div>

      </main>
    </div>
  );
}