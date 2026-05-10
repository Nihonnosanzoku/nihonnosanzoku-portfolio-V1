import React from 'react';
import { Card } from '@/components/uI';
import { signIn } from "@/server/auth/auth";
import LoginForm from '@/components/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giriş Yap | Nihonnosanzoku',
  description: 'Yönetici paneline güvenli giriş.',
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

  async function handleLogin(token: string) {
    "use server";
    
    // Verify token with Cloudflare
    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });
    
    const verifyData = await verifyRes.json();
    
    if (!verifyData.success) {
      throw new Error("Bot doğrulaması başarısız oldu.");
    }

    await signIn("discord", { redirectTo: "/admin" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-foreground relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <Card className="z-10 max-w-md w-full relative backdrop-blur-xl bg-card/60">
        <div className="flex flex-col items-center space-y-6 text-center p-8">
          
          <div className="w-16 h-16 bg-[#5865F2]/20 rounded-full flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(88,101,242,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#5865F2" viewBox="0 0 16 16">
              <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
            </svg>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold mb-2">Gizli Alana Giriş</h1>
            <p className="text-white/60 text-sm">
              Sadece sistem yöneticisi tarafından kaydedilmiş Onaylı Discord hesapları girebilir.
            </p>
          </div>

          {params?.error === "AccessDenied" && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded text-sm font-medium w-full text-left">
              Erişim Reddedildi: Hesabınız sistemde yok veya henüz yönetici onayından geçmedi.
            </div>
          )}

          {params?.error === "NotRegistered" && (
            <div className="bg-orange-500/10 border border-orange-500/30 text-orange-400 p-3 rounded text-sm font-medium w-full text-left">
              Hesabınız sistemde kayıtlı değil. Lütfen bir yönetici ile iletişime geçin.
            </div>
          )}

          {params?.error === "NotApproved" && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 p-3 rounded text-sm font-medium w-full text-left">
              Hesabınız kayıtlı ancak henüz onaylanmamış. Lütfen yönetici onayını bekleyin.
            </div>
          )}

          <LoginForm signInAction={handleLogin} siteKey={siteKey} />

          <p className="text-xs text-white/40 mt-4">
            Bu bir özel sistemdir. Herkese açık kayıt kapalıdır.
          </p>

        </div>
      </Card>
    </div>
  );
}
