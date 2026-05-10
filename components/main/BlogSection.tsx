import Link from 'next/link';
import { Text, PostCard } from '@/components/uI';

interface BlogSectionProps {
  posts: any[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-8 backdrop-blur-2xl shadow-2xl">
      <div className="flex justify-between items-end mb-8">
        <div>
          <Text variant="h2" className="text-2xl font-extrabold text-white">Latest Notes</Text>
          <Text variant="p" className="text-white/40 text-sm mt-1 font-medium">Thoughts, experiments, and tutorials.</Text>
        </div>
        <Link href="/blog" className="text-primary text-sm font-bold hover:underline">Read All &rarr;</Link>
      </div>

      <div className="flex flex-col gap-4">
        {posts.length === 0 ? (
          <Text variant="p" className="text-white/40 text-sm">Henüz yazı yok...</Text>
        ) : (
          posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}
