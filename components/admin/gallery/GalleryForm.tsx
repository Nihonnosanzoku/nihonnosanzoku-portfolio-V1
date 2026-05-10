'use client';

import React, { useState, useRef, useActionState, useEffect } from 'react';
import { Upload, Plus, Link, File, Shield } from 'lucide-react';

interface Role {
  id: string;
  name: string;
}

interface GalleryFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: any;
  roles: Role[];
  onSuccess?: () => void;
}

export default function GalleryForm({ action, initialData, roles, onSuccess }: GalleryFormProps) {
  const [uploadType, setUploadType] = useState<'url' | 'file'>(
    initialData?.url?.startsWith('http') && !initialData?.url?.includes('/uploads') ? 'url' : 'file'
  );
  
  // Get initial role IDs from initialData
  const initialRoleIds = initialData?.allowedRoles?.map((r: any) => r.id) || [];
  const [selectedRoles, setSelectedRoles] = useState<string[]>(initialRoleIds);

  const formRef = useRef<HTMLFormElement>(null);

  const [state, submitAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    try {
      if (initialData?.id) {
        formData.append('id', initialData.id);
      }
      // Add selected roles to formData
      selectedRoles.forEach(roleId => {
        formData.append('allowedRoles', roleId);
      });

      await action(formData);
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message || "Bir hata oluştu." };
    }
  }, { success: false, error: null });

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setSelectedRoles([]);
      if (onSuccess) onSuccess();
    }
  }, [state.success, onSuccess]);

  const toggleRole = (roleId: string) => {
    setSelectedRoles(prev => 
      prev.includes(roleId) ? prev.filter(id => id !== roleId) : [...prev, roleId]
    );
  };

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all duration-700"></div>
      
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10 text-white">
        <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
          <Plus className="w-4 h-4 text-primary" />
        </span>
        {initialData ? 'Medyayı Düzenle' : 'Yeni Medya Ekle'}
      </h2>
      
      <form ref={formRef} action={submitAction} className="space-y-6 relative z-10">
        {state.error && <p className="text-red-500 text-sm font-medium">{state.error}</p>}

        {/* Toggle UI */}
        <div className="flex p-1 bg-black/40 border border-white/5 rounded-2xl w-fit mb-6">
          <button 
            type="button" 
            onClick={() => setUploadType('file')}
            className={`flex items-center gap-2 py-2 px-6 rounded-xl text-xs font-bold transition-all ${uploadType === 'file' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-white/40 hover:text-white/60'}`}
          >
            <File className="w-3.5 h-3.5" /> Dosya Yükle
          </button>
          <button 
            type="button" 
            onClick={() => setUploadType('url')}
            className={`flex items-center gap-2 py-2 px-6 rounded-xl text-xs font-bold transition-all ${uploadType === 'url' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-white/40 hover:text-white/60'}`}
          >
            <Link className="w-3.5 h-3.5" /> URL Yapıştır
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex flex-col justify-center min-h-[80px]">
                {uploadType === 'file' ? (
                <div className="space-y-2 animate-in fade-in slide-in-from-left-2 duration-300">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Medya Dosyası</label>
                    <input 
                    type="file" 
                    name="file" 
                    accept="image/*,video/*"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 transition-all cursor-pointer"
                    />
                </div>
                ) : (
                <div className="space-y-2 animate-in fade-in slide-in-from-right-2 duration-300">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Medya URL'si</label>
                    <input 
                    name="url" 
                    defaultValue={initialData?.url || ''}
                    type="text"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/[0.05] transition-all"
                    placeholder="https://... (Görsel veya Video URL)"
                    />
                </div>
                )}
            </div>
            
            <div className="space-y-2 flex flex-col justify-end">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Açıklama (Alt Metin)</label>
                <input 
                name="alt" 
                defaultValue={initialData?.alt || ''}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/[0.05] transition-all"
                placeholder="Görselin ne hakkında olduğunu kısaca açıklayın..."
                />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" /> Görünürlük (Roller)
            </label>
            <div className="grid grid-cols-2 gap-3 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                {roles.length > 0 ? roles.map(role => (
                    <button
                        key={role.id}
                        type="button"
                        onClick={() => toggleRole(role.id)}
                        className={`p-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${selectedRoles.includes(role.id) ? 'bg-primary/20 border-primary text-primary' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10'}`}
                    >
                        {role.name}
                    </button>
                )) : (
                    <p className="col-span-2 text-[10px] text-white/20 italic">Önce rol oluşturmalısınız.</p>
                )}
            </div>
            <p className="text-[10px] text-white/20 italic">Seçilen roller bu medyayı görebilir. Boş bırakılırsa (Admins hariç) kimse göremez.</p>
          </div>
        </div>

        <button type="submit" disabled={isPending} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-5 rounded-3xl font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 text-lg active:scale-[0.98] mt-4">
          {isPending ? 'Kaydediliyor...' : (
            <>
              <Upload className="w-6 h-6" /> {initialData ? 'Güncelle' : 'Galeriye Ekle'}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
