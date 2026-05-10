'use client';

import React, { useState, useEffect } from 'react';
import { Footer } from '@/components/uI';
import Loading from '@/components/uI/Loading';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="site-wrapper min-h-screen bg-[var(--background)] flex flex-col selection:bg-primary/30 animate-in fade-in duration-1000">
      <main className="flex-1 relative">
        {children}
      </main>
      <Footer />
    </div>
  );
}
