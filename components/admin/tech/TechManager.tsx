'use client';

import React, { useState } from 'react';
import { Trash2, Code2, Plus, X, PenBox } from 'lucide-react';
import TechForm from './TechForm';

interface TechManagerProps {
  techs: any[];
  addTechAction: (formData: FormData) => Promise<void>;
  updateTechAction: (formData: FormData) => Promise<void>;
  deleteTechAction: (formData: FormData) => Promise<void>;
}

export default function TechManager({ techs, addTechAction, updateTechAction, deleteTechAction }: TechManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<any>(null);

  const openAddModal = () => {
    setEditingTech(null);
    setIsModalOpen(true);
  };

  const openEditModal = (tech: any) => {
    setEditingTech(tech);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTech(null);
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
          <Code2 className="w-8 h-8 text-primary" />
          Yetenekler (Tech Arsenal)
        </h1>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl shadow-lg shadow-primary/30 hover:scale-105 transition-all font-bold"
        >
          <Plus className="w-5 h-5" /> Yeni Yetenek
        </button>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-bold mb-4 ml-1 flex items-center gap-2 text-white">
          <Code2 className="w-5 h-5 text-primary" /> Mevcut Yetenekler ({techs.length})
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techs.map((tech: any) => {
             const isUrlOrPath = tech.iconSvg?.startsWith('http') || tech.iconSvg?.startsWith('/uploads');
             const isSvg = tech.iconSvg?.trim().startsWith('<svg');

             return (
              <div key={tech.id} className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:border-white/20 transition-all backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden border border-white/5 relative bg-black"
                    style={{ color: tech.color || 'white' }}
                  >
                    <div className="absolute inset-0 opacity-10" style={{ backgroundColor: tech.color || 'white' }} />
                    
                    {isUrlOrPath ? (
                      <img src={tech.iconSvg} alt={tech.name} className="w-8 h-8 object-contain relative z-10" />
                    ) : isSvg ? (
                      <div className="w-8 h-8 flex items-center justify-center p-1 relative z-10" dangerouslySetInnerHTML={{ __html: tech.iconSvg }} />
                    ) : (
                      <Code2 className="w-6 h-6 relative z-10" />
                    )}
                  </div>
                  <div>
                    <span className="font-bold text-white block">{tech.name}</span>
                    <span className="text-[10px] text-white/30 font-mono">{tech.color || 'Varsayılan'}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditModal(tech)}
                    className="text-white/20 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-xl"
                  >
                    <PenBox className="w-5 h-5" />
                  </button>
                  <form action={deleteTechAction}>
                    <input type="hidden" name="id" value={tech.id} />
                    <button type="submit" className="text-red-500/30 hover:text-red-500 transition-colors p-3 hover:bg-red-500/10 rounded-xl" title="Sil">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200 p-4 sm:p-6">
          <div className="bg-[#0a0a0a] w-full max-w-2xl border border-white/10 shadow-2xl rounded-[2.5rem] flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden max-h-[90vh]">
            
            <div className="flex justify-between items-center p-8 border-b border-white/5 bg-white/[0.02]">
              <h2 className="text-2xl font-black text-white tracking-tight">
                {editingTech ? 'Yetenek Düzenle' : 'Yeni Yetenek Ekle'}
              </h2>
              <button onClick={closeModal} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all hover:scale-110 active:scale-90">
                <X className="w-6 h-6 text-white/70" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              <TechForm 
                action={editingTech ? updateTechAction : addTechAction} 
                initialData={editingTech} 
                onSuccess={closeModal} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
