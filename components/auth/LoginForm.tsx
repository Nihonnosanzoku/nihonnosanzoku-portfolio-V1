'use client';

import React, { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { Button } from '@/components/uI';

interface LoginFormProps {
  signInAction: (token: string) => Promise<void>;
  siteKey: string;
}

export default function LoginForm({ signInAction, siteKey }: LoginFormProps) {
  const [token, setToken] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Lütfen robot olmadığınızı doğrulayın.");
      return;
    }

    setIsPending(true);
    setError(null);
    try {
      await signInAction(token);
    } catch (err: any) {
      // Important: Next.js redirect() throws an error that should not be caught
      if (err.message === 'NEXT_REDIRECT') throw err;
      
      setError(err.message || "Giriş yapılırken bir hata oluştu.");
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded text-sm font-medium w-full text-left">
          {error}
        </div>
      )}

      <div className="flex justify-center">
        <Turnstile 
          siteKey={siteKey} 
          onSuccess={(token: string) => setToken(token)} 
          onError={() => setError("Doğrulama hatası oluştu.")}
          onExpire={() => setToken(null)}
          options={{ theme: 'dark' }}
        />
      </div>

      <Button 
        className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-6 flex items-center justify-center gap-2 text-base font-semibold shadow-lg shadow-[#5865F2]/20 rounded-xl disabled:opacity-50" 
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Giriş Yapılıyor...
          </>
        ) : (
          <>
            Discord ile Giriş Yap
          </>
        )}
      </Button>
    </form>
  );
}
