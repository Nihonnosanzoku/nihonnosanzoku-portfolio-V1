import React from 'react';
import Link from 'next/link';
import { Avatar, Text, SoundLink } from '@/components/uI';
import { Github, Terminal, AppWindow } from 'lucide-react';

interface HeroSectionProps {
  adminProfile: any;
  siteSettings: any;
  randomVoice: any;
}

export default function HeroSection({ adminProfile, siteSettings, randomVoice }: HeroSectionProps) {
  return (
    <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-8 backdrop-blur-2xl relative overflow-hidden group shadow-2xl animate-in slide-in-from-top-8 duration-1000">
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px] -mr-10 -mt-10 transition-transform duration-1000 group-hover:scale-150 animate-pulse-slow"></div>

      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="relative group">
          <Avatar 
            src={adminProfile?.image || '/placeholder-avatar.png'} 
            alt={adminProfile?.name || 'Admin'} 
            size="xl" 
            glow={true} 
            discordId={adminProfile?.discordId || ''} 
            avatarDecoration={adminProfile?.avatarDecoration || ''}
          />
        </div>
        <div className="flex gap-3">
          <Link href={siteSettings?.githubLink || "#"} target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 backdrop-blur-md hover:scale-110 active:scale-95">
            <Github className="w-5 h-5" />
          </Link>
          <Link href={siteSettings?.discordLink || "#"} target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#5865F2] transition-all border border-white/10 backdrop-blur-md group/dc hover:scale-110 active:scale-95">
            <svg className="w-5 h-5 fill-current text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
          </Link>
        </div>
      </div>

      <div className="relative z-10">
        <Text variant="h1" className="text-4xl font-extrabold tracking-tight text-white mb-2 italic">
          {adminProfile?.name || 'Admin'}
        </Text>
        <Text variant="h2" className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 mb-6 tracking-wide">
          {siteSettings?.heroTitle || 'Front-End Developer'}
        </Text>
        <Text variant="p" className="text-white/60 leading-relaxed text-sm font-medium">
          {siteSettings?.heroBio || 'Hi 👋, my name is Erdem. I am a software developer.'}
        </Text>
      </div>

      <div className="flex flex-wrap gap-4 mt-8 relative z-10">
        <Link 
            href={siteSettings?.spotifyLink || "#"} 
            target="_blank" 
            className="group relative text-[11px] font-black uppercase tracking-widest text-white/70 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 hover:bg-primary/20 hover:border-primary/40 hover:text-white transition-all overflow-hidden flex items-center gap-2"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          <Terminal className="w-4 h-4 text-primary" /> Spotify ↗
        </Link>
        
        <Link 
            href={siteSettings?.anilistLink || "#"} 
            target="_blank" 
            className="group relative text-[11px] font-black uppercase tracking-widest text-white/70 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 hover:bg-primary/20 hover:border-primary/40 hover:text-white transition-all overflow-hidden flex items-center gap-2"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          <AppWindow className="w-4 h-4 text-primary" /> AniList ↗
        </Link>

        <SoundLink 
          href={randomVoice?.url || "#"} 
          soundSrc={randomVoice?.sound || "/sounds/Yürü-git.opus"} 
          external 
          delay={1500}
          className="group relative text-[11px] font-black uppercase tracking-widest text-purple-400 bg-purple-900/20 px-6 py-3 rounded-2xl border border-purple-500/30 hover:bg-purple-900/40 hover:text-purple-300 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.1)] overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          {randomVoice?.label || "Eski Site"} ↗
        </SoundLink>
      </div>
    </div>
  );
}
