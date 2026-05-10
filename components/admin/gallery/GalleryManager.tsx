'use client';

import React, { useState } from 'react';
import { Trash2, Plus, X, PenBox, Image as ImageIcon } from 'lucide-react';
import GalleryForm from './GalleryForm';

interface GalleryManagerProps {
  images: any[];
  roles: any[];
  addImageAction: (formData: FormData) => Promise<void>;
  updateImageAction: (formData: FormData) => Promise<void>;
  deleteImageAction: (formData: FormData) => Promise<void>;
}

export default function GalleryManager({ images, roles, addImageAction, updateImageAction, deleteImageAction }: GalleryManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<any>(null);

  const openAddModal = () => {
    setEditingImage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (img: any) => {
    setEditingImage(img);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingImage(null);
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
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <ImageIcon className="w-8 h-8 text-primary" />
          Galeri Yönetimi
        </h1>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-lg shadow-primary/30 hover:scale-105 transition-all font-bold"
        >
          <Plus className="w-5 h-5" /> Yeni Medya
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img: any) => (
          <div key={img.id} className="relative group rounded-3xl overflow-hidden aspect-square w-full border border-white/10 shadow-2xl bg-white/[0.02]">
            <img 
              src={img.url} 
              alt={img.alt || 'Gallery image'} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
              <button 
                onClick={() => openEditModal(img)}
                className="bg-white/10 hover:bg-white text-white hover:text-black p-3 rounded-2xl transition-all shadow-xl active:scale-95 border border-white/10" 
                title="Düzenle"
              >
                <PenBox className="w-5 h-5" />
              </button>
              
              <form action={deleteImageAction}>
                <input type="hidden" name="id" value={img.id} />
                <button type="submit" className="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white p-3 rounded-2xl transition-all shadow-xl active:scale-95 border border-red-500/20" title="Sil">
                  <Trash2 className="w-5 h-5" />
                </button>
              </form>
            </div>

            {img.alt && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <p className="text-[10px] text-white truncate font-medium text-center">{img.alt}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200 p-4 sm:p-6">
          <div className="bg-[#0a0a0a] w-full max-w-2xl border border-white/10 shadow-2xl rounded-[2.5rem] flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden max-h-[90vh]">
            
            <div className="flex justify-between items-center p-8 border-b border-white/5 bg-white/[0.02]">
              <h2 className="text-2xl font-black text-white tracking-tight">
                {editingImage ? 'Medyayı Düzenle' : 'Yeni Medya Ekle'}
              </h2>
              <button onClick={closeModal} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all hover:scale-110 active:scale-90">
                <X className="w-6 h-6 text-white/70" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              <GalleryForm 
                action={editingImage ? updateImageAction : addImageAction} 
                initialData={editingImage} 
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
