"use client";

import { useState, useEffect, useMemo } from "react";
import config from "@/data/config.json";
import { getRandomItem, playSoundAndRedirect } from "@/lib/utils";

interface ActionItem {
  sound: string;
  url: string;
  label: string;
}

export default function ActionButton({ className }: { className?: string }) {
  const [isActing, setIsActing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const action = useMemo(() => {
    if (!mounted || !config.actions.length) return null;
    return getRandomItem(config.actions) as ActionItem;
  }, [mounted]);

  const handleClick = async () => {
    if (!action || isActing) return;
    setIsActing(true);

    await playSoundAndRedirect(
      action.sound,
      action.url,
      () => setIsActing(false)
    );
  };

  const getButtonText = () => {
    if (!mounted) return "YÜKLENİYOR...";
    if (isActing) return "YOLCULUK BAŞLADI...";
    return action?.label || "BENİ KOV";
  };

  return (
    <button
      onClick={handleClick}
      disabled={!mounted || isActing}
      className={`
        group relative px-8 py-4 
        bg-white/5 backdrop-blur-xl
        text-white/90 font-bold text-sm tracking-[0.2em]
        rounded-2xl transition-all duration-700 ease-in-out
        min-w-[200px] overflow-hidden
        border border-white/10
        ${(!mounted || isActing) 
          ? 'opacity-50 cursor-wait' 
          : 'hover:bg-primary/20 hover:border-primary/40 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] active:scale-95'}
        ${className}
      `}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-primary/20 via-transparent to-primary/20" />
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      
      <span className="relative z-10 uppercase font-medium italic">
        {getButtonText()}
      </span>
    </button>
  );
}
