
import React from 'react';
import Link from 'next/link';
import { Settings, FolderKanban, FileText, Image as ImageIcon, Music, Home, LogOut, Users, Minus, Shield } from 'lucide-react';
import { Text, Avatar } from '@/components/uI';

type UserData = {
  name: string | null;
  image: string | null;
  role: string;
  discordId?: string | null;
  avatarDecoration?: string | null;
};

export default function AdminSidebar({ user }: { user: UserData | null }) {
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <Home className="w-5 h-5" /> },
    { name: 'Genel Ayarlar', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
    { name: 'Kullanıcılar', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'Roller', path: '/admin/roles', icon: <Shield className="w-5 h-5" /> },
    { name: 'Yetenekler', path: '/admin/tech', icon: <FolderKanban className="w-5 h-5" /> },
    { name: 'Blog Yazıları', path: '/admin/blog', icon: <FileText className="w-5 h-5" /> },
    { name: 'Galeri', path: '/admin/gallery', icon: <ImageIcon className="w-5 h-5" /> },
    { name: 'Müzikler', path: '/admin/music', icon: <Music className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 border-r border-white/10 bg-white/[0.02] flex flex-col pt-8 backdrop-blur-xl h-screen sticky top-0 overflow-y-auto no-scrollbar">
      <div className="px-6 mb-8">
        <Link href="/admin" className="group">
          <Text variant="h2" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 group-hover:opacity-80 transition-opacity">
            Admin Panel
          </Text>
        </Link>
      </div>

      <nav className="flex-1 px-4 flex flex-col gap-1">
        <div className="mb-4">
           <Text variant="span" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 px-4 mb-2 block">Menü</Text>
           {menuItems.map((item) => (
            <Link key={item.path} href={item.path} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/60 hover:text-white font-medium text-sm">
              {item.icon}
              <Text variant="span">{item.name}</Text>
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-white/10 flex flex-col gap-4 mt-auto">
        {/* Discord Profile Display */}
        {user && (
          <div className="flex items-center gap-3 px-2 py-2 bg-white/[0.03] rounded-2xl border border-white/5">
              <Avatar 
                src={user.image || '/placeholder-avatar.png'} 
                alt={user.name || 'Admin'} 
                size="md" 
                glow={true} 
                discordId={user.discordId}
                avatarDecoration={user.avatarDecoration}
              />
            <div className="flex flex-col">
              <Text variant="span" className="font-bold text-white text-xs truncate max-w-[100px]">{user.name || 'Admin'}</Text>
              <Text variant="span" className="text-white/30 text-[10px] uppercase font-black tracking-tighter">Yönetici</Text>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/40 hover:text-white text-xs">
            <Home className="w-3.5 h-3.5" />
            <Text variant="span">Yİğitin amına Dön</Text>
          </Link>
          <a href="/api/auth/signout" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-red-500/10 transition-colors text-red-500/50 hover:text-red-500 text-xs">
            <LogOut className="w-3.5 h-3.5" />
            <Text variant="span">Oturumu Kapat</Text>
          </a>
        </div>
      </div>
    </aside>
  );
}
