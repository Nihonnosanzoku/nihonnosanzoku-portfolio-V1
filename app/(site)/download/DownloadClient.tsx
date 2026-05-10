'use client';

import React, { useState } from 'react';
import { Progress } from '@/components/uI';
import { Download as DownloadIcon, AlertCircle, CheckCircle2, PlayCircle } from 'lucide-react';

export default function DownloadClient() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ filename: string; url: string; error?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'İndirme hatası');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-foreground relative p-4 md:p-12 overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-black to-black opacity-80 pointer-events-none"></div>
      
      <main className="relative z-10 w-full max-w-2xl flex flex-col gap-8">
        <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-8 md:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] transition-transform duration-1000 group-hover:scale-150 pointer-events-none"></div>

          <div className="flex flex-col gap-4 mb-10 text-center items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/10 shadow-inner group-hover:rotate-12 transition-transform">
              <DownloadIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-2">Video İndirici</h1>
              <p className="text-white/50 text-sm max-w-sm">yt-dlp arayüzü. İndirmek istediğiniz videonun linkini aşağıya yapıştırın.</p>
            </div>
          </div>

          <div className="flex flex-col gap-5 relative z-10">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white/70 ml-1">Video URL</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://youtube.com/..." 
                  className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono text-sm"
                />
                <PlayCircle className="absolute right-4 top-4 w-5 h-5 text-white/30" />
              </div>
            </div>

            <button 
              onClick={handleDownload} 
              disabled={loading || !url}
              className="w-full bg-primary text-black font-bold text-base py-4 rounded-2xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-lg shadow-primary/20"
            >
              İndirmeyi Başlat
            </button>
          </div>
          
          {loading && (
            <div className="mt-8 relative z-10 animate-fade-in text-center flex flex-col items-center">
              <p className="text-sm font-medium text-white/60 mb-4 animate-pulse">Video işleniyor, lütfen bekleyin...</p>
              <div className="w-full max-w-sm opacity-80">
                <Progress indeterminate={true} />
              </div>
            </div>
          )}
          
          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-950/30 border border-red-500/30 flex items-start gap-3 relative z-10 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}
          
          {result && !result.error && (
            <div className="mt-6 p-6 rounded-2xl bg-green-950/20 border border-green-500/20 relative z-10 animate-fade-in text-center flex flex-col items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-green-400 font-bold mb-1">İndirme Başarılı!</p>
                <p className="text-green-400/60 text-xs mb-4">{(result as any).fileName || (result as any).filename}</p>
                <a 
                  href={(result as any).downloadPath || (result as any).url} 
                  className="inline-flex items-center gap-2 bg-primary text-black hover:bg-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-primary/20 scale-105"
                  download={(result as any).fileName || (result as any).filename}
                >
                  <DownloadIcon className="w-5 h-5" /> Dosyayı Kaydet
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
