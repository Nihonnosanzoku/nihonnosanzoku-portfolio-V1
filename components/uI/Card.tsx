import React from 'react';

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`bg-card text-card-foreground p-6 rounded-[var(--radius)] border border-border shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export default Card;
