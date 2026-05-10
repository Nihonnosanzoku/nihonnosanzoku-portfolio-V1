import React from 'react';

const Progress = ({ value = 0, max = 100, indeterminate = false, className = '' }: { value?: number, max?: number, indeterminate?: boolean, className?: string }) => {
  const percentage = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`w-full overflow-hidden rounded-full bg-secondary h-2 ${className}`}>
      {indeterminate ? (
        <div className="h-full bg-primary rounded-full w-full animate-pulse opacity-80" />
      ) : (
        <div 
          className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${percentage}%` }}
        />
      )}
    </div>
  );
};

export default Progress;
