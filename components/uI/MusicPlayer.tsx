'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, SkipBack, SkipForward, Music, Youtube, ExternalLink, X, Volume2 } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  artist: string;
  link: string;
  platform: string;
  coverUrl?: string | null;
  videoUrl?: string | null;
}

export default function MusicPlayer({ songs }: { songs: Song[] }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showEmbed, setShowEmbed] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentSong = songs[currentIdx];

  const nextSong = () => {
    setCurrentIdx((prev) => (prev + 1) % songs.length);
    setShowEmbed(false);
  };

  const prevSong = () => {
    setCurrentIdx((prev) => (prev - 1 + songs.length) % songs.length);
    setShowEmbed(false);
  };

  useEffect(() => {
    if (showEmbed && currentSong.videoUrl && videoRef.current) {
        videoRef.current.play().catch(err => console.error("Autoplay failed:", err));
    }
  }, [showEmbed, currentIdx, currentSong.videoUrl]);

  if (!songs.length) return null;

  const getEmbedUrl = (link: string) => {
    if (link.includes('spotify.com')) {
      return link.replace('track/', 'embed/track/').replace('album/', 'embed/album/').replace('playlist/', 'embed/playlist/');
    }
    if (link.includes('youtube.com/watch?v=')) {
        const videoId = new URL(link).searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (link.includes('youtu.be/')) {
        const videoId = link.split('/').pop();
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(currentSong.link);
  const isSpotify = currentSong.platform === 'Spotify';

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full max-w-[1400px] mx-auto px-4">
      
      {/* Main Player Card */}
      <div className="w-full lg:w-[55%] bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-10 backdrop-blur-3xl shadow-[0_0_150px_rgba(0,0,0,0.7)] relative overflow-hidden group">
        {/* Dynamic Background Glow */}
        <div 
          className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-all duration-1000 bg-gradient-to-br ${isSpotify ? 'from-[#1DB954]/40' : 'from-red-500/40'} via-transparent to-transparent`}
        />
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Cover Art with Vinyl Effect */}
          <div className="relative mb-6 md:mb-10 group/cover">
             <div className="absolute -inset-4 bg-white/5 rounded-full blur-2xl opacity-0 group-hover/cover:opacity-100 transition-opacity duration-700 animate-pulse" />
             
             <div className="w-56 h-56 md:w-72 md:h-72 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 border border-white/10 group-hover/cover:scale-[1.02] transition-transform duration-500">
                {currentSong.coverUrl ? (
                <img src={currentSong.coverUrl} alt={currentSong.title} className="w-full h-full object-cover" />
                ) : (
                <div className="w-full h-full bg-white/[0.03] flex items-center justify-center">
                    <Music className="w-16 h-16 md:w-24 md:h-24 text-white/5" />
                </div>
                )}
                
                {!showEmbed && (embedUrl || currentSong.videoUrl) && (
                    <button 
                        onClick={() => setShowEmbed(true)}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover/cover:opacity-100 transition-all flex items-center justify-center backdrop-blur-md"
                    >
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white text-black flex items-center justify-center scale-75 group-hover/cover:scale-100 transition-all shadow-2xl hover:bg-primary hover:text-white">
                            <Play className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1" />
                        </div>
                    </button>
                )}
             </div>

             {showEmbed && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8 z-20">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className={`w-1.5 bg-primary rounded-full animate-music-bar`} style={{ animationDelay: `${i * 0.15}s`, height: `${20 + Math.random() * 60}%` }} />
                    ))}
                </div>
             )}
          </div>

          <div className="text-center w-full max-w-md">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-3 tracking-tighter line-clamp-1 group-hover:text-primary transition-colors">
                {currentSong.title}
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6 md:mb-10">
                <span className="h-[1px] w-8 bg-white/10" />
                <p className="text-white/40 font-black tracking-[0.3em] text-[10px] uppercase">
                    {currentSong.artist}
                </p>
                <span className="h-[1px] w-8 bg-white/10" />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 md:gap-10 mb-8 md:mb-12">
            <button onClick={prevSong} className="group/btn p-4 md:p-5 rounded-2xl md:rounded-3xl bg-white/5 hover:bg-white/10 text-white/30 hover:text-white transition-all active:scale-90 border border-white/5">
              <SkipBack className="w-6 h-6 md:w-7 md:h-7 fill-current group-hover/btn:-translate-x-0.5 transition-transform" />
            </button>
            
            <button 
                onClick={() => {
                    if (currentSong.videoUrl && videoRef.current) {
                        if (videoRef.current.paused) {
                            videoRef.current.play();
                            setShowEmbed(true);
                        } else {
                            videoRef.current.pause();
                            setShowEmbed(false);
                        }
                    } else {
                        setShowEmbed(!showEmbed);
                    }
                }}
                className={`w-20 h-20 md:w-24 md:h-24 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center transition-all active:scale-95 shadow-[0_15px_40px_rgba(0,0,0,0.3)] ${showEmbed ? 'bg-white/10 text-white ring-2 ring-white/20' : 'bg-primary text-primary-foreground shadow-primary/30 hover:scale-105'}`}
            >
              {showEmbed ? <X className="w-10 h-10 md:w-12 md:h-12" /> : <Play className="w-10 h-10 md:w-12 md:h-12 fill-current ml-1.5" />}
            </button>

            <button onClick={nextSong} className="group/btn p-4 md:p-5 rounded-2xl md:rounded-3xl bg-white/5 hover:bg-white/10 text-white/30 hover:text-white transition-all active:scale-90 border border-white/5">
              <SkipForward className="w-6 h-6 md:w-7 md:h-7 fill-current group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Platform Link / Embed */}
          <div className="w-full">
            {showEmbed ? (
                currentSong.videoUrl ? (
                    <div className="w-full aspect-video rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 animate-in slide-in-from-bottom-10 fade-in duration-700 shadow-2xl bg-black group/video relative">
                        <video 
                            ref={videoRef}
                            src={currentSong.videoUrl}
                            className="w-full h-full object-cover cursor-pointer"
                            autoPlay
                            playsInline
                            onClick={() => {
                                if (videoRef.current?.paused) videoRef.current.play();
                                else videoRef.current?.pause();
                            }}
                        />
                        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 opacity-0 group-hover/video:opacity-100 transition-opacity">
                             <div className="px-3 py-1.5 md:px-4 md:py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-[8px] md:text-[10px] font-bold text-white/60 uppercase tracking-widest">
                                Tıklayarak durdur/başlat
                             </div>
                        </div>
                    </div>
                ) : embedUrl ? (
                    <div className={`w-full overflow-hidden border border-white/10 animate-in slide-in-from-bottom-10 fade-in duration-700 shadow-2xl bg-black ${isSpotify ? 'h-[152px] rounded-3xl' : 'aspect-video rounded-[1.5rem] md:rounded-[2.5rem]'}`}>
                        <iframe 
                            src={embedUrl}
                            className="w-full h-full"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                            loading="lazy"
                        />
                    </div>
                ) : null
            ) : (
                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4 px-6 md:px-8 py-3 md:py-4 bg-white/5 rounded-2xl md:rounded-3xl border border-white/5 backdrop-blur-xl group/plat transition-all hover:border-white/20">
                        {isSpotify ? <Music className="w-5 h-5 md:w-6 md:h-6 text-[#1DB954]" /> : <Youtube className="w-5 h-5 md:w-6 md:h-6 text-red-500" />}
                        <span className="text-[10px] md:text-xs font-black tracking-widest text-white/60 uppercase">{currentSong.platform} üzerinde dinle</span>
                        <a href={currentSong.link} target="_blank" className="p-2 bg-white/5 rounded-lg md:rounded-xl hover:bg-primary hover:text-white transition-all">
                            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Playlist Section */}
      <div className="flex-1 w-full bg-[#0a0a0a]/60 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 backdrop-blur-2xl h-[500px] md:h-[800px] flex flex-col shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-16 md:h-24 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        
        <div className="relative z-20 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-black text-white flex items-center gap-4">
                    <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    Playlist
                </h3>
                <span className="px-2 py-1 md:px-3 md:py-1 bg-white/5 border border-white/10 rounded-full text-[8px] md:text-[10px] font-black text-white/40 uppercase tracking-widest">
                    {songs.length} Track
                </span>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 md:pr-4 space-y-3 md:space-y-4 custom-scrollbar">
                {songs.map((song, idx) => (
                    <button
                        key={song.id}
                        onMouseEnter={() => setIsHovered(song.id)}
                        onMouseLeave={() => setIsHovered(null)}
                        onClick={() => {
                            setCurrentIdx(idx);
                            setShowEmbed(true);
                        }}
                        className={`w-full flex items-center gap-3 md:gap-5 p-3 md:p-5 rounded-2xl md:rounded-3xl transition-all border text-left group relative overflow-hidden ${currentIdx === idx ? 'bg-primary/10 border-primary/40' : 'bg-white/[0.02] border-transparent hover:border-white/10 hover:bg-white/5'}`}
                    >
                        {currentIdx === idx && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 md:w-1.5 md:h-10 bg-primary rounded-r-full" />}
                        
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 relative border border-white/10 shadow-lg">
                            {song.coverUrl ? (
                                <img src={song.coverUrl} className={`w-full h-full object-cover transition-transform duration-700 ${currentIdx === idx ? 'scale-110' : 'group-hover:scale-110'}`} />
                            ) : (
                                <div className="w-full h-full bg-black/40 flex items-center justify-center">
                                    <Music className="w-4 h-4 md:w-6 md:h-6 text-white/10" />
                                </div>
                            )}
                            {(currentIdx === idx || isHovered === song.id) && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px] animate-in fade-in duration-300">
                                    <Play className={`w-6 h-6 md:w-8 md:h-8 ${currentIdx === idx ? 'fill-primary text-primary' : 'fill-white text-white'}`} />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className={`font-bold text-sm md:text-base truncate mb-0.5 md:mb-1 ${currentIdx === idx ? 'text-primary' : 'text-white/90'}`}>{song.title}</h4>
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] md:text-xs font-bold text-white/30 truncate uppercase tracking-widest">{song.artist}</p>
                                {currentIdx === idx && (
                                    <div className="flex gap-0.5 md:gap-1 h-2 md:h-3">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="w-0.5 md:w-1 bg-primary animate-music-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      </div>

      <style jsx global>{`
        @keyframes music-bar {
            0%, 100% { height: 20%; }
            50% { height: 100%; }
        }
        .animate-music-bar {
            animation: music-bar 0.8s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--primary);
        }
      `}</style>
    </div>
  );
}
