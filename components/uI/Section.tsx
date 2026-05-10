import React from 'react';

const Section = ({ title, subtitle, children, className = '' }: { title: string, subtitle?: string, children: React.ReactNode, className?: string }) => {
  return (
    <section className={`w-full flex flex-col gap-4 mt-16 ${className} animate-fade-in fade-in-up`}>
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">{title}</h2>
        {subtitle && <p className="text-foreground/50 text-sm mt-1 font-medium">{subtitle}</p>}
      </div>
      <div className="mt-4">
        {children}
      </div>
    </section>
  );
};

export default Section;
