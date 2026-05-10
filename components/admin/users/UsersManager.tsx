'use client';

import React, { useState } from 'react';
import { Card, Avatar, Button } from '@/components/uI';
import { UserPlus, Trash2, Shield, CheckCircle2, XCircle, X, PenBox } from 'lucide-react';
import UserForm from './UserForm';

interface UsersManagerProps {
  users: any[];
  roles: any[];
  addUserAction: (formData: FormData) => Promise<void>;
  updateUserAction: (formData: FormData) => Promise<void>;
  deleteUserAction: (id: string) => Promise<void>;
  adminDiscordId: string;
}

export default function UsersManager({ users, roles, addUserAction, updateUserAction, deleteUserAction, adminDiscordId }: UsersManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const openAddModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">Kullanıcı Yönetimi</h1>
          <p className="text-white/60 text-sm">Sisteme erişebilecek Discord hesaplarını yönetin.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-lg shadow-primary/30 hover:scale-105 transition-all font-bold"
        >
          <UserPlus className="w-5 h-5" /> Yeni Kullanıcı
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4 ml-1 flex items-center gap-2 text-white">
          <Shield className="w-5 h-5 text-primary" />
          Mevcut Kullanıcılar ({users.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <Card key={user.id} className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group overflow-hidden">
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar 
                    src={user.image} 
                    alt={user.name || 'User'} 
                    size="md" 
                    discordId={user.discordId}
                    avatarDecoration={user.avatarDecoration}
                  />
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg text-white">{user.globalName || user.name || 'İsimsiz'}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${user.role === 'ADMIN' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/60'}`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="text-sm text-white/40 flex items-center gap-2">
                      {user.email}
                      {user.isApproved ? (
                        <span className="flex items-center gap-1 text-green-400 text-[10px] bg-green-400/10 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Onaylı
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-yellow-400 text-[10px] bg-yellow-400/10 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3" /> Onay Bekliyor
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditModal(user)}
                    className="p-3 rounded-xl hover:bg-white/10 text-white/20 hover:text-white transition-all"
                  >
                    <PenBox className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
                        deleteUserAction(user.id);
                      }
                    }}
                    disabled={user.discordId === adminDiscordId}
                    className="p-3 rounded-xl hover:bg-red-500/20 text-white/20 hover:text-red-500 transition-all disabled:opacity-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200 p-4 sm:p-6">
          <div className="bg-[#0a0a0a] w-full max-w-2xl border border-white/10 shadow-2xl rounded-[2.5rem] flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden max-h-[90vh]">
            
            <div className="flex justify-between items-center p-8 border-b border-white/5 bg-white/[0.02]">
              <h2 className="text-2xl font-black text-white tracking-tight">
                {editingUser ? 'Kullanıcıyı Düzenle' : 'Yeni Kullanıcı Ekle'}
              </h2>
              <button onClick={closeModal} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all hover:scale-110 active:scale-90">
                <X className="w-6 h-6 text-white/70" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              <UserForm 
                action={editingUser ? updateUserAction : addUserAction} 
                initialData={editingUser} 
                roles={roles}
                onSuccess={closeModal} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
