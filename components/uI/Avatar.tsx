'use client';

import React, { useEffect, useState } from 'react';

type DiscordStatusType = 'online' | 'idle' | 'dnd' | 'offline';

const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  size = 'md', 
  className = '',
  glow = false,
  status,
  discordId,
  avatarDecoration
}: { 
  src?: string | null, 
  alt?: string | null, 
  size?: 'sm' | 'md' | 'lg' | 'xl', 
  className?: string,
  glow?: boolean,
  status?: DiscordStatusType,
  discordId?: string | null,
  avatarDecoration?: string | null
}) => {
  const [realTimeStatus, setRealTimeStatus] = useState<DiscordStatusType | undefined>(status);
  const [discordAvatarUrl, setDiscordAvatarUrl] = useState<string | null>(null);
  const [hideDecoration, setHideDecoration] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!discordId || discordId === 'undefined' || discordId === 'null') return;
      
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
        if (!res.ok) return;

        const data = await res.json();
        if (data.success) {
          setRealTimeStatus(data.data.discord_status);
          
          const discordUser = data.data.discord_user;
          if (discordUser && discordUser.avatar) {
            const isGif = discordUser.avatar.startsWith('a_');
            const ext = isGif ? 'gif' : 'png';
            setDiscordAvatarUrl(`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.${ext}`);
          }
        }
      } catch (e) {
        // Silent catch for common network errors to prevent console spam
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, [discordId]);

  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [src, discordId]);

  useEffect(() => {
    if (!avatarDecoration || !(avatarDecoration.startsWith('http') || avatarDecoration.startsWith('/'))) {
      setHideDecoration(true);
      return;
    }

    const img = new window.Image();
    img.src = avatarDecoration;
    img.onload = () => setMounted(true);
    img.onerror = () => setHideDecoration(true);
  }, [avatarDecoration]);

  const displayStatus = discordId ? (realTimeStatus || status || 'dnd') : status;
  const displaySrc = (!imageError && (discordAvatarUrl || src)) || null;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const statusConfig = {
    online: { bg: 'bg-[#23a559]', content: null },
    idle: { bg: 'bg-[#f0b232]', content: <div className="w-1/2 h-1/2 bg-[#1e1f22] rounded-full absolute -top-[1px] -left-[1px]"></div> },
    dnd: { bg: 'bg-[#f23f42]', content: <div className="w-[60%] h-[15%] bg-[#1e1f22] rounded-full"></div> },
    offline: { bg: 'bg-[#80848e]', content: <div className="w-1/2 h-1/2 bg-[#1e1f22] rounded-full"></div> },
  };

  const statusSizeClasses = {
    sm: 'w-3 h-3 -bottom-0.5 -right-0.5 p-[1.5px]',
    md: 'w-4 h-4 -bottom-1 -right-1 p-[2px]',
    lg: 'w-5 h-5 -bottom-1 -right-1 p-[2px]',
    xl: 'w-6 h-6 -bottom-1 -right-1 p-[2px]',
  };

  const glowWrapper = glow 
    ? "p-[2px] bg-gradient-to-b from-purple-400 to-purple-700 shadow-[0_0_15px_rgba(168,85,247,0.6)]" 
    : "border border-white/10 shadow-2xl shadow-black";

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <div className={`relative flex items-center justify-center rounded-full ${sizeClasses[size]} ${glowWrapper} overflow-hidden`}>
        {displaySrc ? (
          <img 
            src={displaySrc} 
            alt={alt || 'Avatar'} 
            className="w-full h-full rounded-full object-cover" 
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="w-full h-full rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-semibold">
            {alt?.charAt(0).toUpperCase() || 'A'}
          </span>
        )}
      </div>
      
      {mounted && avatarDecoration && !hideDecoration && (avatarDecoration.startsWith('http') || avatarDecoration.startsWith('/')) && (
        <img 
          src={avatarDecoration} 
          className="absolute -top-[12%] -left-[12%] w-[124%] h-[124%] max-w-none pointer-events-none z-20" 
          alt=""
          onError={() => setHideDecoration(true)}
        />
      )}

      {displayStatus && (
        <div className={`absolute ${statusSizeClasses[size]} bg-[#1e1f22] rounded-full flex items-center justify-center z-30`}>
          <div className={`relative w-full h-full ${statusConfig[displayStatus].bg} rounded-full flex items-center justify-center overflow-hidden`}>
            {statusConfig[displayStatus].content}
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
