import React from 'react';
import { Text } from '@/components/uI';

interface Activity {
  id: string;
  type: 'post' | 'user' | 'tech';
  description: string;
  date: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-xl mt-8 shadow-xl">
      <Text variant="h3" className="text-xl font-bold text-white mb-6">Son Aktiviteler</Text>
      
      <div className="space-y-4">
        {activities.length === 0 ? (
          <Text variant="p" className="text-white/50 text-sm">Henüz bir aktivite yok.</Text>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${activity.type === 'post' ? 'bg-green-500' : activity.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                <Text variant="p" className="text-white/80 font-medium text-sm">{activity.description}</Text>
              </div>
              <Text variant="span" className="text-xs text-white/40">{new Date(activity.date).toLocaleDateString('tr-TR')}</Text>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
