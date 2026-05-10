'use client';

import React, { useState, useRef, useActionState, useEffect } from 'react';
import { Button } from '@/components/uI';
import { Shield, Mail, User as UserIcon, Check, Hash } from 'lucide-react';

interface Role {
  id: string;
  name: string;
}

interface UserFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: any;
  roles: Role[];
  onSuccess?: () => void;
}

export default function UserForm({ action, initialData, roles, onSuccess }: UserFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const initialRoleIds = initialData?.roles?.map((r: any) => r.id) || [];
  const [selectedRoles, setSelectedRoles] = useState<string[]>(initialRoleIds);

  const [state, submitAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    try {
      if (initialData?.id) {
        formData.append('id', initialData.id);
      }
      // Add selected custom roles
      selectedRoles.forEach(id => formData.append('roles', id));

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
    <form ref={formRef} action={submitAction} className="space-y-6">
      {state.error && <p className="text-red-500 text-sm font-medium bg-red-500/10 border border-red-500/20 p-3 rounded-xl">{state.error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
            <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                <UserIcon className="w-3 h-3" /> İsim
            </label>
            <input 
            name="name" 
            defaultValue={initialData?.name || ''}
            type="text" 
            required 
            placeholder="Kullanıcı Adı"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary/50 transition-all text-white placeholder-white/20"
            />
        </div>

        <div className="space-y-2">
            <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                <Mail className="w-3 h-3" /> E-posta
            </label>
            <input 
            name="email" 
            defaultValue={initialData?.email || ''}
            type="email" 
            required 
            placeholder="discord@email.com"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary/50 transition-all text-white placeholder-white/20"
            />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1 flex items-center gap-2">
            <Hash className="w-3 h-3" /> Discord ID
        </label>
        <input 
          name="discordId" 
          defaultValue={initialData?.discordId || ''}
          type="text" 
          required 
          placeholder="Örn: 123456789012345678"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary/50 transition-all text-white placeholder-white/20"
        />
        <p className="text-[10px] text-white/20 italic ml-1">Kullanıcının Discord ile giriş yapabilmesi için bu ID zorunludur.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1 flex items-center gap-2">
            <Shield className="w-3 h-3" /> Sistem Rolü
          </label>
          <select 
            name="role"
            defaultValue={initialData?.role || 'USER'}
            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary/50 transition-all text-white"
          >
            <option value="USER">Standart Kullanıcı</option>
            <option value="ADMIN">Yönetici (Full Erişim)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1 flex items-center gap-2">
            <Check className="w-3 h-3" /> Onay Durumu
          </label>
          <select 
            name="isApproved"
            defaultValue={initialData ? String(initialData.isApproved) : 'true'}
            className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary/50 transition-all text-white"
          >
            <option value="true">Onaylı (Giriş Yapabilir)</option>
            <option value="false">Beklemede (Giriş Yapamaz)</option>
          </select>
        </div>
      </div>

      {/* Custom Roles Selection */}
      <div className="space-y-4">
        <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1 flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" /> Özel Roller
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
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
                <p className="col-span-3 text-[10px] text-white/20 italic">Henüz özel rol oluşturulmamış.</p>
            )}
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="w-full mt-4 py-5 rounded-2xl font-black uppercase tracking-widest bg-primary hover:bg-white text-black shadow-xl shadow-primary/20 transition-all">
        {isPending ? 'Kaydediliyor...' : (initialData ? 'Kullanıcıyı Güncelle' : 'Kullanıcıyı Kaydet')}
      </Button>
    </form>
  );
}
