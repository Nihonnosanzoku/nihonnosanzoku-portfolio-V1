'use client';

import React, { useEffect, useState } from 'react';

interface LanyardData {
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
}

export default function DiscordStatus({ userId }: { userId: string }) {
  const [status, setStatus] = useState<LanyardData['discord_status']>('offline');

  useEffect(() => {
    if (!userId) return;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await res.json();
        if (data.success) {
          setStatus(data.data.discord_status);
        }
      } catch (e) {
        console.error("Lanyard fetch failed:", e);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, [userId]);

  const statusColors = {
    online: 'bg-green-500 shadow-green-500/50',
    idle: 'bg-yellow-500 shadow-yellow-500/50',
    dnd: 'bg-red-500 shadow-red-500/50',
    offline: 'bg-gray-500 shadow-gray-500/50'
  };

  const statusLabels = {
    online: 'Aktif',
    idle: 'Boşta',
    dnd: 'Rahatsız Etmeyin',
    offline: 'Çevrimdışı'
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
      <div className={`w-2.5 h-2.5 rounded-full ${statusColors[status]} shadow-[0_0_8px_rgba(0,0,0,0.5)] animate-pulse`} />
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">
        {statusLabels[status]}
      </span>
    </div>
  );
}
