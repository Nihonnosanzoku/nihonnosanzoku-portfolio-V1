"use client";
import { useEffect, useState, useMemo } from "react";
import config from "@/data/config.json";
import { getRandomItem } from "@/lib/utils";

interface BackgroundSwitcherProps {
  images?: string[];
}

export default function BackgroundSwitcher({ images }: BackgroundSwitcherProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bg = useMemo(() => {
    if (!mounted) return "";
    
    // If images prop is provided, use it
    if (images && images.length > 0) {
      return getRandomItem(images);
    }
    
    // Fallback to config backgrounds
    if (config.backgrounds && config.backgrounds.length > 0) {
      return getRandomItem(config.backgrounds);
    }

    return "";
  }, [mounted, images]);

  if (!mounted) {
    return <div className="absolute inset-0 z-0 bg-black" />;
  }

  return (
    <div 
      className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 animate-in fade-in fill-mode-both"
      style={{ 
        backgroundImage: bg ? `url(${bg})` : 'none',
        backgroundColor: '#000'
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] opacity-70" />
    </div>
  );
}
