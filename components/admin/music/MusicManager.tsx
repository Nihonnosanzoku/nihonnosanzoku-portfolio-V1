'use client';

import React, { useState } from 'react';
import { Trash2, Music, Link as LinkIcon, Youtube, Image as ImageIcon, Video, Plus, X, PenBox } from 'lucide-react';
import MusicForm from './MusicForm';

interface MusicManagerProps {
  songs: any[];
  addSongAction: (formData: FormData) => Promise<void>;
  updateSongAction: (formData: FormData) => Promise<void>;
  deleteSongAction: (formData: FormData) => Promise<void>;
}

export default function MusicManager({ songs, addSongAction, updateSongAction, deleteSongAction }: MusicManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<any>(null);

  const openAddModal = () => {
    setEditingSong(null);
    setIsModalOpen(true);
  };

  const openEditModal = (song: any) => {
    setEditingSong(song);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSong(null);
  };

  // Handle ?new=true query param
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('new') === 'true') {
      openAddModal();
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Music className="w-8 h-8 text-primary" />
          Müzik Kutusu
        </h1>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-lg shadow-primary/30 hover:scale-105 transition-all font-bold"
        >
          <Plus className="w-5 h-5" /> Yeni Şarkı
        </button>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold mb-6 text-white/70 ml-2 uppercase tracking-tighter">Mevcut Şarkılar ({songs.length})</h3>
        {songs.length === 0 && <p className="text-white/50">Müzik kutusu şu an boş.</p>}
        <div className="grid grid-cols-1 gap-4">
            {songs.map((song: any) => (
            <div key={song.id} className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex items-center justify-between group hover:border-primary/40 transition-all backdrop-blur-sm">
                <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-xl bg-black/50 border border-white/5 flex items-center justify-center overflow-hidden relative shadow-2xl">
                    {song.coverUrl ? (
                        <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    ) : (
                        song.platform === 'Spotify' ? <Music className="w-8 h-8 text-green-500" /> : 
                        song.platform === 'YouTube' ? <Youtube className="w-8 h-8 text-red-500" /> : 
                        <LinkIcon className="w-8 h-8 text-gray-400" />
                    )}
                </div>
                <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{song.title}</h3>
                    <p className="text-sm text-white/40 font-medium">{song.artist} • <span className="opacity-70">{song.platform}</span></p>
                </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <a href={song.link} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-all px-4 py-2 bg-white/5 rounded-xl text-sm font-bold border border-white/10 hover:border-white/30">
                      Görüntüle ↗
                  </a>
                  <button 
                    onClick={() => openEditModal(song)}
                    className="text-white/20 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-xl"
                  >
                    <PenBox className="w-5 h-5" />
                  </button>
                  <form action={deleteSongAction}>
                      <input type="hidden" name="id" value={song.id} />
                      <button type="submit" className="text-red-500/30 hover:text-red-500 transition-all p-3 hover:bg-red-500/10 rounded-xl" title="Kaldır">
                        <Trash2 className="w-5 h-5" />
                      </button>
                  </form>
                </div>
            </div>
            ))}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200 p-4 sm:p-6">
          <div className="bg-[#0a0a0a] w-full max-w-2xl border border-white/10 shadow-2xl rounded-[2.5rem] flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden max-h-[90vh]">
            
            <div className="flex justify-between items-center p-8 border-b border-white/5 bg-white/[0.02]">
              <h2 className="text-2xl font-black text-white tracking-tight">
                {editingSong ? 'Şarkıyı Düzenle' : 'Yeni Şarkı Ekle'}
              </h2>
              <button onClick={closeModal} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all hover:scale-110 active:scale-90">
                <X className="w-6 h-6 text-white/70" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              <MusicForm 
                action={editingSong ? updateSongAction : addSongAction} 
                initialData={editingSong} 
                onSuccess={closeModal} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
