import React from 'react';
import { FolderGit2, Star, GitFork } from 'lucide-react';

const RepositoryCard = ({ repo }: { repo: any }) => {
  return (
    <div className="group relative w-full h-full p-6 rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 flex flex-col justify-between">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary border border-white/5 group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-black/50">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono text-white/40">{new Date(repo.updated_at).getFullYear()}</span>
        </div>
        <h3 className="font-bold text-xl mb-2 text-white group-hover:text-primary transition-colors">{repo.name}</h3>
        <p className="text-sm text-white/50 line-clamp-2 leading-relaxed">
          {repo.description || 'Creative software project snippet and experiment.'}
        </p>
      </div>
      
      <div className="relative z-10 flex gap-4 text-xs font-semibold text-white/40 mt-8 pt-4 border-t border-white/10">
        <span className="flex items-center gap-1.5 hover:text-white transition-colors">⭐ {repo.stargazers_count}</span>
        <span className="flex items-center gap-1.5 hover:text-white transition-colors">⑂ {repo.forks}</span>
      </div>
    </div>
  );
};

export default RepositoryCard;
