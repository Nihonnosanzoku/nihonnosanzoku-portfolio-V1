'use client';

import React, { useState } from 'react';
import { Shield, Plus, Edit, Trash2, X, Check } from 'lucide-react';
import { Card } from '@/components/uI';

interface Role {
  id: string;
  name: string;
  description?: string | null;
  _count: {
    users: number;
    gallery: number;
  };
}

interface RolesManagerProps {
  roles: Role[];
  addRoleAction: (formData: FormData) => Promise<void>;
  updateRoleAction: (formData: FormData) => Promise<void>;
  deleteRoleAction: (formData: FormData) => Promise<void>;
}

export default function RolesManager({ roles, addRoleAction, updateRoleAction, deleteRoleAction }: RolesManagerProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Rol Yönetimi</h2>
          <p className="text-white/40 text-sm font-medium">Kullanıcılar ve içerikler için özel yetkilendirme rolleri.</p>
        </div>
        <button 
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-2xl font-bold hover:bg-white transition-all shadow-lg shadow-primary/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Yeni Rol
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="relative group overflow-hidden border-white/5 hover:border-primary/20 transition-all">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingRole(role)} className="p-2 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <form action={deleteRoleAction} onSubmit={(e) => !confirm('Bu rolü silmek istediğinize emin misiniz?') && e.preventDefault()}>
                    <input type="hidden" name="id" value={role.id} />
                    <button type="submit" className="p-2 hover:bg-red-500/10 rounded-xl text-white/60 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{role.name}</h3>
              <p className="text-white/40 text-sm mb-6 line-clamp-2 min-h-[40px]">{role.description || 'Açıklama yok.'}</p>

              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Kullanıcılar</span>
                  <span className="text-lg font-bold text-white">{role._count.users}</span>
                </div>
                <div className="w-[1px] h-8 bg-white/5" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Görseller</span>
                  <span className="text-lg font-bold text-white">{role._count.gallery}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(isAddOpen || editingRole) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => { setIsAddOpen(false); setEditingRole(null); }} />
          <Card className="relative z-10 w-full max-w-md animate-in zoom-in-95 duration-300">
            <form action={editingRole ? updateRoleAction : addRoleAction} onSubmit={() => { setIsAddOpen(false); setEditingRole(null); }} className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                  {editingRole ? 'Rolü Düzenle' : 'Yeni Rol Ekle'}
                </h3>
                <button type="button" onClick={() => { setIsAddOpen(false); setEditingRole(null); }} className="p-2 hover:bg-white/5 rounded-full text-white/40">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {editingRole && <input type="hidden" name="id" value={editingRole.id} />}
                
                <div className="space-y-2">
                  <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Rol İsmi</label>
                  <input 
                    name="name" 
                    defaultValue={editingRole?.name}
                    required 
                    placeholder="Örn: VIP, Özel Üye"
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:border-primary/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-white/40 uppercase tracking-widest ml-1">Açıklama</label>
                  <textarea 
                    name="description" 
                    defaultValue={editingRole?.description || ''}
                    rows={3}
                    placeholder="Rolün amacını açıklayın..."
                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:border-primary/50 transition-all resize-none"
                  />
                </div>

                <button type="submit" className="w-full bg-primary text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-lg shadow-primary/10">
                  <Check className="w-5 h-5" />
                  {editingRole ? 'Güncelle' : 'Oluştur'}
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
