'use client';

import React, { useState, useRef, useActionState, useEffect } from 'react';
import { Upload } from 'lucide-react';

interface TechFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: any;
  onSuccess?: () => void;
}

export default function TechForm({ action, initialData, onSuccess }: TechFormProps) {
  const [color, setColor] = useState(initialData?.color || '#60a5fa');
  const [uploadType, setUploadType] = useState<'text' | 'file'>(
    initialData?.iconSvg?.startsWith('<svg') || initialData?.iconSvg?.startsWith('http') ? 'text' : 'file'
  );
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
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-2xl h-fit shadow-2xl relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all duration-700"></div>
      
      <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2 relative z-10">
        <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <Upload className="w-4 h-4 text-primary" />
        </span>
        {initialData ? 'Yetenek Düzenle' : 'Yetenek Ekle'}
      </h2>

      <form ref={formRef} action={submitAction} className="space-y-6 relative z-10">
        {state.error && <p className="text-red-500 text-sm font-medium">{state.error}</p>}
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Teknoloji Adı</label>
          <input 
            name="name" 
            defaultValue={initialData?.name || ''}
            required
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/[0.05] transition-all"
            placeholder="Örn: React, Node.js..."
          />
        </div>

        {/* Upload Type Toggle */}
        <div className="p-1 bg-black/40 border border-white/5 rounded-2xl flex gap-1">
          <button 
            type="button" 
            onClick={() => setUploadType('file')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${uploadType === 'file' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-white/40 hover:text-white/60'}`}
          >
            Dosya Yükle
          </button>
          <button 
            type="button" 
            onClick={() => setUploadType('text')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${uploadType === 'text' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-white/40 hover:text-white/60'}`}
          >
            Link / SVG
          </button>
        </div>

        <div className="min-h-[100px] flex flex-col justify-center">
          {uploadType === 'file' ? (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">İkon Dosyası</label>
              <div className="relative group/file">
                <input 
                  type="file" 
                  name="iconFile" 
                  accept="image/*,.svg"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-primary/20 file:text-primary hover:file:bg-primary/30 transition-all cursor-pointer"
                />
              </div>
              <p className="text-[10px] text-white/20 ml-1">PNG, JPG veya SVG desteklenir.</p>
            </div>
          ) : (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">SVG Kodu veya URL</label>
              <textarea 
                name="iconSvg" 
                defaultValue={initialData?.iconSvg || ''}
                rows={3}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/[0.05] transition-all font-mono text-xs"
                placeholder="<svg ...>...</svg> veya https://..."
              />
            </div>
          )}
        </div>

        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Marka Rengi</label>
          <div className="flex gap-3">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
              <input 
                type="color"
                name="color_picker"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer"
              />
            </div>
            <input 
              name="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="#60a5fa"
              className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary font-mono"
            />
          </div>
        </div>

        <button type="submit" disabled={isPending} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 mt-6 active:scale-[0.98]">
          {isPending ? 'Kaydediliyor...' : (
            <>
              <Upload className="w-5 h-5" /> {initialData ? 'Güncelle' : 'Kaydet'}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
