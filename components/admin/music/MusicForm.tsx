'use client';

import React, { useRef, useActionState, useEffect } from 'react';
import { Plus, ImageIcon, Video } from 'lucide-react';
import { Button } from '@/components/uI';

interface MusicFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: any;
  onSuccess?: () => void;
}

export default function MusicForm({ action, initialData, onSuccess }: MusicFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, submitAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    try {
      if (initialData?.id) {
        formData.append('id', initialData.id);
      }
      await action(formData);
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message || "Bir hata oluştu." };
    }
  }, { success: false, error: null });

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      if (onSuccess) onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <form ref={formRef} action={submitAction} className="space-y-6">
      {state.error && <p className="text-red-500 text-sm font-medium">{state.error}</p>}
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Url (Spotify / YouTube)</label>
          <input 
            name="link" 
            defaultValue={initialData?.link || ''}
            type="url"
            required
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary"
            placeholder="https://..."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Şarkı Adı</label>
            <input 
              name="title" 
              defaultValue={initialData?.title || ''}
              required
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary"
              placeholder="Şarkı Adı..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Sanatçı Adı</label>
            <input 
              name="artist" 
              defaultValue={initialData?.artist || ''}
              required
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary"
              placeholder="Sanatçı..."
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Platform</label>
          <select 
            name="platform" 
            defaultValue={initialData?.platform || 'Auto'}
            className="w-full bg-black/80 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary"
          >
            <option value="Auto">Linkten Otomatik Bul</option>
            <option value="Spotify">Spotify</option>
            <option value="YouTube">YouTube</option>
            <option value="Apple Music">Apple Music</option>
            <option value="SoundCloud">SoundCloud</option>
            <option value="Diğer">Diğer</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1 flex items-center gap-2">
            <ImageIcon className="w-3 h-3" /> Kapak Görsel Durumu (URL)
          </label>
          <input 
            name="coverUrl" 
            defaultValue={initialData?.coverUrl || ''}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary"
            placeholder="Görsel linki..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1 flex items-center gap-2">
            <Video className="w-3 h-3" /> Video Alternatifi (YouTube URL)
          </label>
          <input 
            name="videoUrl" 
            defaultValue={initialData?.videoUrl || ''}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary"
            placeholder="Varsa video linki..."
          />
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-5 rounded-3xl font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 text-lg mt-4 active:scale-[0.98]">
        {isPending ? 'Kaydediliyor...' : (initialData ? 'Şarkıyı Güncelle' : 'Şarkıyı Listeye Ekle')}
      </Button>
    </form>
  );
}
