import React from 'react';
import { Text, TechBadge } from '@/components/uI';
import { Code2, Terminal, Palette, Library, AppWindow, Database, Network, Cpu } from 'lucide-react';

interface TechSectionProps {
  activeTechStack: any[];
}

export default function TechSection({ activeTechStack }: TechSectionProps) {
  // We can't map IconMap dynamically easily if they are stored as strings without a map, 
  // but we can use the fallback logic that was in page.tsx
  
  return (
    <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-8 backdrop-blur-2xl shadow-2xl">
      <Text variant="h2" className="text-xl font-extrabold text-white mb-6">Tech Arsenal</Text>
      <div className="flex flex-wrap gap-3">
        {activeTechStack.map((tech: any) => {
          const isUrlOrPath = tech.iconSvg?.startsWith('http') || tech.iconSvg?.startsWith('/uploads');
          const isSvg = tech.iconSvg?.trim().startsWith('<svg');
          
          let icon = <Code2 className="w-5 h-5" />;
          if (isUrlOrPath) {
            icon = <img src={tech.iconSvg} alt={tech.name} className="w-6 h-6 object-contain" />;
          } else if (isSvg) {
            icon = <div className="w-6 h-6 flex items-center justify-center p-1" dangerouslySetInnerHTML={{ __html: tech.iconSvg }} />;
          }

          return (
            <TechBadge 
              key={tech.name} 
              name={tech.name} 
              icon={icon} 
              color={tech.color} 
            />
          );
        })}
      </div>
    </div>
  );
}
