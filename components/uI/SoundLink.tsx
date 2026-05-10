'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Volume2 } from 'lucide-react';

interface SoundLinkProps {
  href: string;
  soundSrc?: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  delay?: number;
}

export const SoundLink = ({ 
  href, 
  soundSrc = '/sounds/ui-click.mp3', // Fallback sound
  children, 
  className = '',
  external = false,
  delay = 800 // 800ms delay to let the sound play
}: SoundLinkProps) => {
  const router = useRouter();
  const [isActivating, setIsActivating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isActivating) return;

    setIsActivating(true);

    // Play sound
    if (!audioRef.current) {
      audioRef.current = new Audio(soundSrc);
      audioRef.current.volume = 0.5;
    }
    
    // Reset and play
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(err => console.error("Audio play failed:", err));

    // Redirect after delay
    setTimeout(() => {
      if (external) {
        window.location.href = href;
      } else {
        router.push(href);
      }
      setIsActivating(false);
    }, delay);
  };

  return (
    <button 
      onClick={handleClick}
      className={`relative overflow-hidden group transition-all duration-300 ${className} ${isActivating ? 'scale-95 opacity-80' : 'hover:scale-105'}`}
    >
      {/* Ripple/Glow effect on activation */}
      <div 
        className={`absolute inset-0 bg-white/20 rounded-xl blur-md transition-opacity duration-300 ${isActivating ? 'opacity-100' : 'opacity-0'}`}
      />
      
      <div className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {isActivating && (
          <Volume2 className="w-4 h-4 animate-pulse text-primary" />
        )}
      </div>
    </button>
  );
};
