import React from 'react';
import { prisma } from '@/server/config/prisma.config';
import { Music as MusicIcon } from 'lucide-react';
import { MusicPlayer } from '@/components/uI';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Müzik Kutusu | Nihonnosanzoku',
  description: 'Favori parçalarım ve playlistlerim.',
};

export const revalidate = 60;

export default async function SongsPage() {
  const dbSongs = await (prisma as any).song.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const songs = dbSongs.length > 0 ? dbSongs : [];

  return (
    <div className="min-h-screen bg-black text-foreground relative p-4 md:p-12 overflow-hidden flex flex-col items-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-black to-black opacity-80 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      
      <main className="relative z-10 w-full max-w-[1400px] mt-12 flex flex-col gap-12">
        <div className="flex flex-col gap-3 mb-4 items-center text-center">
           <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center text-primary mb-6 border border-primary/20 shadow-[0_0_50px_rgba(var(--primary-rgb),0.2)] group animate-pulse">
            <MusicIcon className="w-10 h-10 group-hover:scale-110 transition-transform" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
            Play<span className="text-primary italic">list</span>
          </h1>
          <p className="text-white/40 text-lg font-medium max-w-xl">Ruh halimi yansıtan, kod yazarken veya dinlenirken favorim olan parçalar.</p>
        </div>

        {songs.length > 0 ? (
          <MusicPlayer songs={songs} />
        ) : (
          <div className="rounded-[3rem] bg-white/[0.02] border border-white/5 p-20 backdrop-blur-2xl shadow-2xl flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <MusicIcon className="w-10 h-10 text-white/10" />
            </div>
            <p className="text-white/30 text-xl font-bold italic tracking-widest uppercase">Müzik kutusu şu an sessiz...</p>
          </div>
        )}
      </main>
    </div>
  );
}
