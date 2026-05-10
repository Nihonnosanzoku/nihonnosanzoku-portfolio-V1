'use client';

import React, { useRef, useActionState, useEffect } from 'react';
import { Button } from '@/components/uI';

interface SettingsFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: any;
  onSuccess?: () => void;
}

export default function SettingsForm({ action, initialData, onSuccess }: SettingsFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, submitAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    try {
      await action(formData);
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message || "Bir hata oluştu." };
    }
  }, { success: false, error: null });

  useEffect(() => {
    if (state.success) {
      if (onSuccess) onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <form ref={formRef} action={submitAction} className="space-y-6">
      {state.error && <p className="text-red-500 text-sm font-medium">{state.error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 ml-1">Ünvan (Hero Title)</label>
          <input 
            name="heroTitle" 
            defaultValue={initialData?.heroTitle || ''} 
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="Front-End Developer vb."
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-white/70 ml-1">Hakkımda (Hero Bio)</label>
          <textarea 
            name="heroBio" 
            defaultValue={initialData?.heroBio || ''} 
            rows={3}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="Kendinizden kısaca bahsedin..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 ml-1">GitHub Linki</label>
          <input 
            name="githubLink" 
            type="url"
            defaultValue={initialData?.githubLink || ''} 
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 ml-1">Discord Davet Linki</label>
          <input 
            name="discordLink" 
            type="url"
            defaultValue={initialData?.discordLink || ''} 
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 ml-1">Spotify Linki</label>
          <input 
            name="spotifyLink" 
            type="url"
            defaultValue={initialData?.spotifyLink || ''} 
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 ml-1">AniList Linki</label>
          <input 
            name="anilistLink" 
            type="url"
            defaultValue={initialData?.anilistLink || ''} 
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isPending} className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
          {isPending ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
        </Button>
      </div>
    </form>
  );
}
