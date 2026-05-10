import React from 'react';

const TechBadge = ({ name, icon, color }: { name: string, icon?: React.ReactNode, color?: string }) => {
  return (
    <div 
      className="flex items-center gap-3 px-5 py-3 bg-white/[0.03] border border-white/5 rounded-2xl transition-all hover:bg-white/[0.07] cursor-default group backdrop-blur-md shadow-lg"
      style={{ borderColor: color ? `${color}20` : undefined }}
    >
      {icon ? (
        <span 
          className="w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform"
          style={{ color: color || 'var(--primary)' }}
        >
          {icon}
        </span>
      ) : (
        <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
      )}
      <span className="font-bold text-[13px] tracking-wide text-white/90 group-hover:text-white transition-colors">{name}</span>
    </div>
  );
};

export default TechBadge;
