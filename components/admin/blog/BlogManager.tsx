'use client';

import React, { useState } from 'react';
import { Trash2, PenBox, X, Plus } from 'lucide-react';
import BlogForm from './BlogForm';

interface BlogManagerProps {
  posts: any[];
  addPostAction: (formData: FormData) => Promise<void>;
  updatePostAction: (formData: FormData) => Promise<void>;
  deletePostAction: (formData: FormData) => Promise<void>;
}

export default function BlogManager({ posts, addPostAction, updatePostAction, deletePostAction }: BlogManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  const openAddModal = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const openEditModal = (post: any) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
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
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-white">Yazılar (Blog)</h1>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-lg shadow-primary/30 hover:scale-105 transition-all font-bold"
        >
          <Plus className="w-5 h-5" /> Yeni Yazı
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.length === 0 && <p className="text-white/50">Henüz yazı bulunmamaktadır.</p>}
        {posts.map((post: any) => (
          <div key={post.id} className="bg-white/[0.02] border border-white/10 rounded-xl p-5 group flex flex-col justify-between hover:bg-white/[0.04] transition-colors">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-white truncate pr-4">{post.title}</h3>
                <span className={`text-xs px-2 py-1 rounded border ${post.published ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-orange-500/10 border-orange-500/30 text-orange-400'}`}>
                  {post.published ? 'Yayında' : 'Taslak'}
                </span>
              </div>
              <p className="text-sm text-white/50 line-clamp-2">{post.content}</p>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <span className="text-xs text-white/40">{new Date(post.createdAt).toLocaleDateString('tr-TR')}</span>
              
              <div className="flex gap-2">
                <button onClick={() => openEditModal(post)} className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5">
                  <PenBox className="w-4 h-4" />
                </button>
                <form action={deletePostAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <button type="submit" className="p-2 text-red-500/50 hover:text-red-500 bg-red-500/5 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/10">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200 p-4 sm:p-6">
          <div className="bg-[#0a0a0a] w-full max-w-2xl border border-white/10 shadow-2xl rounded-[2.5rem] flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden max-h-[90vh]">
            
            <div className="flex justify-between items-center p-8 border-b border-white/5 bg-white/[0.02]">
              <h2 className="text-2xl font-black text-white tracking-tight">
                {editingPost ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}
              </h2>
              <button onClick={closeModal} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all hover:scale-110 active:scale-90">
                <X className="w-6 h-6 text-white/70" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              <BlogForm 
                action={editingPost ? updatePostAction : addPostAction} 
                initialData={editingPost} 
                onSuccess={closeModal} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
