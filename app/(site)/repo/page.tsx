import React from 'react';
import RepoService from '@/server/repo/repo.service';
import { RepositoryCard } from '@/components/uI';
import { Network } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projelerim | Nihonnosanzoku',
  description: 'Açık kaynak kodlu projelerim.',
};

import SettingsRepository from '@/server/settings/settings.repository';

const repoService = new RepoService();
const settingsRepo = new SettingsRepository();
export const revalidate = 3600;

export default async function RepoPage() {
  const settings = await settingsRepo.getGlobalSettings();
  const githubLink = settings?.githubLink || 'https://github.com/erslly';
  const username = githubLink.split('/').filter(Boolean).pop() || 'erslly';
  
  const repos = await repoService.getGithubRepos(username);

  return (
    <div className="min-h-screen bg-black text-foreground relative p-4 md:p-12 overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-black to-black opacity-80 pointer-events-none"></div>
      
      <main className="relative z-10 w-full max-w-6xl mt-12 flex flex-col gap-8">
        <div className="flex flex-col gap-2 mb-8 items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4 border border-white/20 shadow-lg">
            <Network className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Projelerim</h1>
          <p className="text-white/50 text-lg">Açık kaynak kodlu uygulamalarım ve denemelerim.</p>
        </div>

        <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-6 md:p-10 backdrop-blur-2xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!Array.isArray(repos) || repos.length === 0 ? (
              <p className="text-white/40 col-span-full text-center py-12">Projeler yüklenemedi...</p>
            ) : (
              repos.map(repo => (
                <RepositoryCard key={repo.id} repo={repo} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
