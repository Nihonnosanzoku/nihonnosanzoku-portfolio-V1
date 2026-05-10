import Link from 'next/link';
import { Text, RepositoryCard } from '@/components/uI';

interface ReposSectionProps {
  repos: any[];
}

export default function ReposSection({ repos }: ReposSectionProps) {
  return (
    <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-8 backdrop-blur-2xl shadow-2xl">
      <div className="flex justify-between items-end mb-8">
        <div>
          <Text variant="h2" className="text-2xl font-extrabold text-white">Repositories</Text>
          <Text variant="p" className="text-white/40 text-sm mt-1 font-medium">Selected GitHub projects.</Text>
        </div>
        <Link href="/repo" className="text-primary text-sm font-bold hover:underline">View All &rarr;</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {repos.length === 0 ? (
          <Text variant="p" className="text-white/40 text-sm">Projeler yüklenemedi...</Text>
        ) : (
          repos.map((repo: any) => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))
        )}
      </div>
    </div>
  );
}
