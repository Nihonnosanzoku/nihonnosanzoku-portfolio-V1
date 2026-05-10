'use client';

import React, { useState } from 'react';
import { Plus, Image as ImageIcon, FileText, X } from 'lucide-react';
import GalleryForm from '@/components/admin/gallery/GalleryForm';
import BlogForm from '@/components/admin/blog/BlogForm';

interface QuickActionsProps {
  roles: any[];
  addImageAction: (formData: FormData) => Promise<void>;
  addPostAction: (formData: FormData) => Promise<void>;
}

export default function QuickActions({ roles, addImageAction, addPostAction }: QuickActionsProps) {
  const [activeModal, setActiveModal] = useState<'gallery' | 'blog' | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <div className="flex flex-col gap-3 mt-6">
        <button 
          onClick={() => setActiveModal('gallery')}
          className="flex items-center gap-4 p-4 rounded-2xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5" />
          </div>
          <span className="font-bold text-primary transition-colors">Galeriye Hızlı Ekle</span>
        </button>

        <button 
          onClick={() => setActiveModal('blog')}
          className="flex items-center gap-4 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5" />
          </div>
          <span className="font-bold text-blue-400 transition-colors">Blog Yazısı Ekle</span>
        </button>
      </div>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#0a0a0a] w-full max-w-2xl border border-white/10 shadow-2xl rounded-[2.5rem] flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden max-h-[90vh]">
            <div className="flex justify-between items-center p-8 border-b border-white/5">
              <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">
                {activeModal === 'gallery' ? 'Galeriye Ekle' : 'Yeni Blog Yazısı'}
              </h2>
              <button onClick={closeModal} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all">
                <X className="w-6 h-6 text-white/70" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              {activeModal === 'gallery' ? (
                <GalleryForm 
                  roles={roles} 
                  action={addImageAction} 
                  onSuccess={closeModal} 
                />
              ) : (
                <BlogForm 
                  action={addPostAction} 
                  onSuccess={closeModal} 
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
