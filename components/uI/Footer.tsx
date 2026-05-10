import Link from 'next/link';
import { Text } from './Text';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-white/5 bg-black/50 backdrop-blur-lg mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start">
          <Text variant="span" className="text-white/80 font-bold text-lg tracking-tight">Nihonnosanzoku</Text>
          <Text variant="p" className="text-white/40 text-sm mt-1 text-center md:text-left">
            Yazılım, tasarım ve açık kaynak projeler.
          </Text>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="/blog" className="text-white/50 hover:text-white text-sm transition-colors font-medium">Blog</Link>
          <Link href="/repo" className="text-white/50 hover:text-white text-sm transition-colors font-medium">Projeler</Link>
          <Link href="/admin" className="text-white/50 hover:text-white text-sm transition-colors font-medium">Panel</Link>
        </div>
        
        <div className="text-white/30 text-xs font-medium text-center md:text-right">
          &copy; {currentYear} Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
