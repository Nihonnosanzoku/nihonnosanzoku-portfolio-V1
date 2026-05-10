'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="relative flex flex-col items-center">
        {/* Animated Rings */}
        <div className="w-24 h-24 rounded-full border-2 border-primary/20 animate-pulse" />
        <div className="absolute top-0 w-24 h-24 rounded-full border-t-2 border-primary animate-spin" />
        
        <div className="mt-8">
            <h2 className="text-xl font-black italic tracking-widest text-white animate-pulse">
                NIHON NO SANZOKU
            </h2>
            <div className="h-0.5 w-full bg-white/5 mt-2 overflow-hidden rounded-full">
                <div className="h-full bg-primary animate-[loading_2s_ease-in-out_infinite]" style={{ width: '40%' }} />
            </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
}
