'use client';

import React, { useState } from 'react';
import { Card, Button } from '@/components/uI';
import { Settings, Edit3, Github, Disc as Discord, Music, Info, X } from 'lucide-react';
import SettingsForm from './SettingsForm';

interface SettingsManagerProps {
  settings: any;
  updateAction: (formData: FormData) => Promise<void>;
}

export default function SettingsManager({ settings, updateAction }: SettingsManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            Genel Ayarlar
          </h1>
          <p className="text-white/40 text-sm mt-1">Site genelindeki temel bilgileri ve sosyal linkleri yönetin.</p>
        </div>
        <button 
          onClick={openModal}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-2xl shadow-lg shadow-primary/30 hover:scale-105 transition-all font-bold"
        >
          <Edit3 className="w-5 h-5" /> Ayarları Düzenle
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Profile Info */}
        <Card className="border-white/5 bg-white/[0.02] p-8">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" /> Profil Bilgileri
          </h3>
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-1">Ünvan</label>
              <p className="text-xl font-medium text-white">{settings?.heroTitle || 'Belirtilmemiş'}</p>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-1">Hakkımda</label>
              <p className="text-white/70 leading-relaxed italic">"{settings?.heroBio || 'Hakkımda yazısı henüz eklenmemiş.'}"</p>
            </div>
          </div>
        </Card>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center border border-white/10 shadow-xl">
                <Github className="w-6 h-6 text-white" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-0.5">GitHub</label>
                <a href={settings?.githubLink} target="_blank" className="text-sm font-bold text-primary hover:underline truncate block max-w-[200px]">
                  {settings?.githubLink || 'Eklenmemiş'}
                </a>
              </div>
            </div>
          </Card>

          <Card className="border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#5865F2]/20 flex items-center justify-center border border-[#5865F2]/20 shadow-xl">
                <Discord className="w-6 h-6 text-[#5865F2]" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-0.5">Discord</label>
                <a href={settings?.discordLink} target="_blank" className="text-sm font-bold text-[#5865F2] hover:underline truncate block max-w-[200px]">
                  {settings?.discordLink || 'Eklenmemiş'}
                </a>
              </div>
            </div>
          </Card>

          <Card className="border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1DB954]/20 flex items-center justify-center border border-[#1DB954]/20 shadow-xl">
                <Music className="w-6 h-6 text-[#1DB954]" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-0.5">Spotify</label>
                <a href={settings?.spotifyLink} target="_blank" className="text-sm font-bold text-[#1DB954] hover:underline truncate block max-w-[200px]">
                  {settings?.spotifyLink || 'Eklenmemiş'}
                </a>
              </div>
            </div>
          </Card>

          <Card className="border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20 shadow-xl">
                <Info className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block mb-0.5">AniList</label>
                <a href={settings?.anilistLink} target="_blank" className="text-sm font-bold text-blue-400 hover:underline truncate block max-w-[200px]">
                  {settings?.anilistLink || 'Eklenmemiş'}
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Modal for Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200 p-4 sm:p-6">
          <div className="bg-[#0a0a0a] w-full max-w-2xl border border-white/10 shadow-2xl rounded-[2.5rem] flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden max-h-[90vh]">
            
            <div className="flex justify-between items-center p-8 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Edit3 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">Ayarları Güncelle</h2>
              </div>
              <button onClick={closeModal} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all hover:scale-110 active:scale-90">
                <X className="w-6 h-6 text-white/70" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              <SettingsForm 
                action={updateAction} 
                initialData={settings} 
                onSuccess={closeModal} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
