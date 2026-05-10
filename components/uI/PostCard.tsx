import React from 'react';
import { BookOpen } from 'lucide-react';

const PostCard = ({ post }: { post: any }) => {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-black border border-white/10 flex flex-shrink-0 items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner overflow-hidden">
          {post.author?.image ? (
            <img src={post.author.image} alt={post.author.name} className="w-full h-full object-cover" />
          ) : (
            <BookOpen className="w-6 h-6" />
          )}
        </div>
        <div>
          <h3 className="font-bold text-base text-white/90 group-hover:text-primary transition-colors">{post.title}</h3>
          <div className="flex items-center gap-2 mt-1">
             {post.author?.name && <span className="text-[10px] uppercase tracking-widest text-primary/60 font-bold">{post.author.name}</span>}
             <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
             <p className="text-sm text-white/40 line-clamp-1">{post.content}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
        <span className="text-xs font-semibold text-white/40 bg-black/40 border border-white/5 px-4 py-2 rounded-full shadow-inner">
          {new Date(post.createdAt).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>
    </div>
  );
};

export default PostCard;
