"use client";

import { useEffect, useState, useMemo } from "react";
import config from "@/data/config.json";
import { getRandomItem } from "@/lib/utils";

export default function BackgroundSwitcher() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Sadece mounted durumunu asenkron olarak güncelliyoruz
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Rastgele resmi render sırasında hesaplıyoruz (State kullanmıyoruz)
  // useMemo kullanımı ESLint'in 'set-state-in-effect' kuralına takılmaz
  const bg = useMemo(() => {
    if (!mounted) return "";
    return getRandomItem(config.backgrounds);
  }, [mounted]);

  // Sunucu tarafında veya henüz mount edilmemişken siyah ekran göster
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
      {/* Yazıların okunabilirliğini artıran katman */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
    </div>
  );
}