'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Download, Maximize2, ExternalLink } from 'lucide-react';

import { isVideo } from '@/lib/utils';

interface GalleryImage {
  id: string;
  url: string;
  alt?: string | null;
  role: string;
}

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename || 'download.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(url, '_blank');
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setIsZoomed(false);
  };

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {images.map((img) => (
          <div 
            key={img.id} 
            className="break-inside-avoid relative group overflow-hidden rounded-3xl border border-white/10 bg-black/50 cursor-zoom-in shadow-lg"
            onClick={() => setSelectedImage(img)}
          >
            {isVideo(img.url) ? (
                <video 
                  src={img.url} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
            ) : (
                <Image 
                  src={img.url} 
                  alt={img.alt || 'Gallery Image'} 
                  width={800}
                  height={1000}
                  quality={95}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
            )}
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform">
                    <Maximize2 className="w-6 h-6" />
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
              <p className="text-white font-semibold text-sm truncate pr-4">{img.alt || 'Görsel'}</p>
              <button 
                onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(img.url, `${img.alt || 'img'}-${img.id}.jpg`);
                }}
                className="p-2 bg-primary/20 hover:bg-primary text-primary hover:text-black rounded-lg transition-all"
                title="İndir"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex flex-col animate-in fade-in duration-300">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={closeLightbox} />
          
          {/* Controls Bar */}
          <div className="relative z-20 flex items-center justify-between p-4 md:p-8 bg-gradient-to-b from-black/60 to-transparent">
             <div className="flex flex-col">
                <h3 className="text-white font-bold text-lg md:text-xl truncate max-w-[200px] md:max-w-md">{selectedImage.alt || 'Görsel Detayı'}</h3>
                {selectedImage.role === 'ADMIN' && <span className="text-primary text-[10px] font-black uppercase tracking-widest mt-1">Özel İçerik</span>}
             </div>
             
             <div className="flex items-center gap-2 md:gap-4">
                <button 
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all border border-white/10"
                    title={isZoomed ? "Küçült" : "Yakınlaştır"}
                >
                    <Maximize2 className={`w-5 h-5 md:w-6 md:h-6 ${isZoomed ? 'rotate-180' : ''}`} />
                </button>
                <button 
                    onClick={() => handleDownload(selectedImage.url, `${selectedImage.alt || 'img'}.jpg`)}
                    className="p-3 bg-white/5 hover:bg-primary text-white hover:text-black rounded-full transition-all border border-white/10"
                >
                    <Download className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button 
                    onClick={closeLightbox}
                    className="p-3 bg-white/5 hover:bg-red-500 text-white rounded-full transition-all border border-white/10"
                >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
             </div>
          </div>

          {/* Image Container */}
          <div className={`relative z-10 flex-1 flex items-center justify-center p-2 md:p-10 overflow-auto scrollbar-hide ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`} onClick={() => !isZoomed && setIsZoomed(true)}>
            <div className={`transition-all duration-500 ease-out flex items-center justify-center ${isZoomed ? 'min-w-full min-h-full' : 'w-full h-full'}`}>
              {isVideo(selectedImage.url) ? (
                <video 
                  src={selectedImage.url} 
                  controls
                  autoPlay
                  className={`max-w-none transition-all duration-500 ${isZoomed ? 'w-auto h-auto' : 'w-full h-full object-contain'}`}
                />
              ) : (
                <img 
                    src={selectedImage.url} 
                    alt={selectedImage.alt || ''} 
                    className={`max-w-none transition-all duration-500 ${isZoomed ? 'w-auto h-auto' : 'w-full h-full object-contain'}`}
                    onClick={(e) => {
                        if(isZoomed) {
                            e.stopPropagation();
                            setIsZoomed(false);
                        }
                    }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
