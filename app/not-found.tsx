import React from 'react';
import Link from 'next/link';
import { prisma } from '@/server/config/prisma.config';
import BackgroundSwitcher from '@/components/uI/BackgroundSwitcher';
import { Home } from 'lucide-react';

export default async function NotFound() {
  // Fetch some public images for the background
  let imageUrls = ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920'];
  
  try {
    const images = await prisma.gallery.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' }
    });
    
    if (images.length > 0) {
      imageUrls = images.map(img => img.url);
    }
  } catch (error) {
    console.warn("[Build/Runtime] NotFound: Could not fetch gallery images from DB, using fallback.");
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <BackgroundSwitcher images={imageUrls} />
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-[12rem] md:text-[18rem] font-black text-white/5 italic tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          404
        </h1>
        
        <div className="space-y-6 animate-in zoom-in duration-700">
            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase">
                Yolunu mu kaybettin?
            </h2>
            <p className="text-white/40 text-lg max-w-md mx-auto font-medium tracking-wide">
                Aradığın sayfa gölgeler arasında kaybolmuş olabilir.
            </p>
            
            <div className="pt-8">
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-black font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95"
                >
                    <Home className="w-5 h-5" /> Eve Dön
                </Link>
            </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 text-white/10 text-[10px] font-black uppercase tracking-[0.5em] hidden md:block">
        NIHON NO SANZOKU - ERROR_GATEWAY
      </div>
    </div>
  );
}
