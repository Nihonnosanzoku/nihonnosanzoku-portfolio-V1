import React from 'react';
import { Text } from '@/components/uI';
import { Briefcase } from 'lucide-react';

export default function ConnectSection() {
  return (
    <div className="rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-8 backdrop-blur-2xl flex flex-col justify-center items-center text-center group cursor-pointer hover:border-primary/40 transition-colors shadow-2xl">
      <Text variant="span" className="mb-3 group-hover:scale-125 transition-transform duration-500">
        <Briefcase className="w-8 h-8 text-primary" />
      </Text>
      <Text variant="h3" className="text-xl font-bold text-white mb-2">Let's work together!</Text>
      <Text variant="p" className="text-sm text-white/60">I'm currently available for freelance projects.</Text>
    </div>
  );
}
