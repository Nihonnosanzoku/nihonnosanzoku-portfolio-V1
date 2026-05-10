import React from 'react';

const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string }) => {
  return (
    <button 
      className={`bg-primary text-primary-foreground px-4 py-2 rounded-[var(--radius)] hover:opacity-90 transition-opacity ${className || ''}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
