import BackgroundSwitcher from "@/components/BackgroundSwitcher";
import ActionButton from "@/components/ActionButton";
import seo from "@/config/seo.json";
import { Instagram, Github, Twitter, Music2 } from "lucide-react";

export default function ConstructionPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* Arka Plan Bileşeni */}
      <BackgroundSwitcher />

      {/* Ana İçerik */}
      <div className="relative z-20 text-center space-y-12 px-4">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter drop-shadow-2xl">
            NIHON NO SANZOKU
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-purple-500/50" />
            <p className="text-gray-400 tracking-[0.8em] text-xs md:text-sm uppercase font-medium">
              YAPIM AŞAMASINDA
            </p>
            <div className="h-[1px] w-12 bg-purple-500/50" />
          </div>
        </div>

        {/* Aksiyon Butonu */}
        <div className="flex justify-center">
          <ActionButton />
        </div>
      </div>

      {/* Footer - Sosyal Medya ve Telif Hakları */}
      <footer className="absolute bottom-10 z-20 flex flex-col items-center gap-6 w-full">
        {/* Sosyal Medya İkonları */}
        <div className="flex items-center gap-4">
          <SocialLink 
            href={seo.social.instagram} 
            icon={<Instagram size={18} />} 
          />
          <SocialLink 
            href={seo.social.github} 
            icon={<Github size={18} />} 
          />
          <SocialLink 
            href={seo.social.tiktok} 
            icon={<Music2 size={18} />} 
          />
          <SocialLink 
            href={`https://twitter.com/${seo.social.twitter.replace("@","")}`} 
            icon={<Twitter size={18} />} 
          />
        </div>

        {/* Telif Hakkı */}
        <p className="text-[10px] text-gray-400 tracking-[0.4em] uppercase opacity-60">
          &copy; 2026 NIHON NO SANZOKU
        </p>
      </footer>
    </main>
  );
}

/**
 * Footer için yardımcı sosyal medya bileşeni
 * Transparan blur efekti ve hover animasyonu içerir.
 */
function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-full 
                 bg-white/5 backdrop-blur-md border border-white/10 
                 text-white/70 transition-all duration-300 
                 hover:bg-purple-600/30 hover:text-white hover:border-purple-500/50 
                 hover:-translate-y-1 active:scale-90 shadow-lg shadow-black/20"
    >
      {icon}
    </a>
  );
}