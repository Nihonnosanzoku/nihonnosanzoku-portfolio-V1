'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Plus, FileText, FolderKanban, Image as ImageIcon, Music, X } from 'lucide-react';
import { Text } from '@/components/uI';

export default function QuickAddFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { name: 'Blog Yazısı', path: '/admin/blog?new=true', icon: <FileText className="w-5 h-5" />, color: 'from-blue-500 to-cyan-400' },
    { name: 'Yetenek', path: '/admin/tech?new=true', icon: <FolderKanban className="w-5 h-5" />, color: 'from-purple-500 to-pink-400' },
    { name: 'Medya', path: '/admin/gallery?new=true', icon: <ImageIcon className="w-5 h-5" />, color: 'from-orange-500 to-yellow-400' },
    { name: 'Müzik', path: '/admin/music?new=true', icon: <Music className="w-5 h-5" />, color: 'from-green-500 to-emerald-400' },
  ];

  return (
    <div className="fixed bottom-12 right-12 z-[100]" ref={menuRef}>
      {/* Menu Items (Stacked) */}
      <div className={`absolute bottom-full right-0 mb-6 flex flex-col gap-4 transition-all duration-500 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        {menuItems.map((item, idx) => (
          <Link 
            key={idx}
            href={item.path}
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-4 justify-end"
          >
            <span className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl">
              {item.name}
            </span>
            <div className={`w-14 h-14 rounded-[1.5rem] bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all`}>
              {item.icon}
            </div>
          </Link>
        ))}
      </div>

      {/* Main Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-20 h-20 rounded-[2.2rem] flex items-center justify-center transition-all duration-500 shadow-[0_20px_50px_rgba(var(--primary-rgb),0.3)] hover:scale-110 active:scale-90 ${isOpen ? 'bg-white text-black rotate-0' : 'bg-primary text-primary-foreground rotate-0'}`}
      >
        {isOpen ? <X className="w-10 h-10" /> : <Plus className="w-10 h-10" />}
      </button>
    </div>
  );
}
