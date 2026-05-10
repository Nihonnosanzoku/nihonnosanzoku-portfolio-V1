'use client';

import React, { useRef, useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';

interface BlogFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: any;
  onSuccess?: () => void;
}

export default function BlogForm({ action, initialData, onSuccess }: BlogFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, submitAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    try {
      // Pass the ID if we are editing
      if (initialData?.id) {
        formData.append('id', initialData.id);
      }
      await action(formData);
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message || "Bir hata oluştu. Lütfen tekrar deneyin." };
    }
  }, { success: false, error: null });

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [state.success, onSuccess]);

  return (
    <form ref={formRef} action={submitAction} className="space-y-4">
      {state.error && <p className="text-red-500 text-sm font-medium">{state.error}</p>}
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">Başlık</label>
        <input 
          name="title" 
          defaultValue={initialData?.title || ''}
          required
          disabled={isPending}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary disabled:opacity-50"
          placeholder="Örn: React v19 ile Gelen Yenilikler..."
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">İçerik (Markdown destekli veya Düz Metin)</label>
        <textarea 
          name="content" 
          defaultValue={initialData?.content || ''}
          required
          rows={10}
          disabled={isPending}
          className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary font-mono text-sm leading-relaxed disabled:opacity-50"
          placeholder="Bugün yeni bir şeyler öğrendim..."
        />
      </div>
      
      <div className="flex items-center gap-3">
         <input 
           type="checkbox" 
           name="published" 
           id="published" 
           disabled={isPending}
           className="w-5 h-5 accent-primary disabled:opacity-50" 
           defaultChecked={initialData ? initialData.published : true} 
         />
         <label htmlFor="published" className="text-white/80 font-medium">Yayında</label>
      </div>
      
      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Kaydediliyor...
          </>
        ) : (initialData ? 'Değişiklikleri Kaydet' : 'Yazıyı Paylaş')}
      </button>
    </form>
  );
}
