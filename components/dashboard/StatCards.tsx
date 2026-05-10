import React from 'react';
import { Users, FileText, FolderKanban, ImageIcon } from 'lucide-react';
import { Text } from '@/components/uI';

interface StatCardsProps {
  stats: {
    users: number;
    posts: number;
    tech: number;
    gallery: number;
  };
}

export default function StatCards({ stats }: StatCardsProps) {
  const cards = [
    { title: 'Toplam Kullanıcı', value: stats.users, icon: <Users className="w-6 h-6 text-blue-400" />, bg: 'from-blue-500/20 to-transparent', border: 'border-blue-500/20' },
    { title: 'Yayımlanan Yazı', value: stats.posts, icon: <FileText className="w-6 h-6 text-green-400" />, bg: 'from-green-500/20 to-transparent', border: 'border-green-500/20' },
    { title: 'Eklenen Yetenek', value: stats.tech, icon: <FolderKanban className="w-6 h-6 text-purple-400" />, bg: 'from-purple-500/20 to-transparent', border: 'border-purple-500/20' },
    { title: 'Galeri Görseli', value: stats.gallery, icon: <ImageIcon className="w-6 h-6 text-pink-400" />, bg: 'from-pink-500/20 to-transparent', border: 'border-pink-500/20' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <div key={idx} className={`bg-gradient-to-br ${card.bg} border ${card.border} rounded-2xl p-6 backdrop-blur-xl flex items-center justify-between shadow-xl`}>
          <div>
            <Text variant="p" className="text-white/60 text-sm font-medium mb-1">{card.title}</Text>
            <Text variant="h2" className="text-3xl font-extrabold text-white">{card.value}</Text>
          </div>
          <div className="bg-black/40 p-4 rounded-xl border border-white/5">
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
