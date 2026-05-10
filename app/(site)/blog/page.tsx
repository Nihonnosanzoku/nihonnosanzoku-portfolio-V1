import React from 'react';
import BlogService from '@/server/blog/blog.service';
import { PostCard } from '@/components/uI';
import { PenTool } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yazılarım | Nihonnosanzoku',
  description: 'Teknoloji ve yazılım üzerine notlarım.',
};

import Link from 'next/link';

const blogService = new BlogService();
export const revalidate = 60;

export default async function BlogPage() {
  const posts = await blogService.getAllPublishedPosts();

  return (
    <div className="min-h-screen bg-black text-foreground relative p-4 md:p-12 overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-black to-black opacity-80 pointer-events-none"></div>
      
      <main className="relative z-10 w-full max-w-4xl mt-12 flex flex-col gap-8">
        <div className="flex flex-col gap-2 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-4 border border-primary/30 shadow-lg shadow-primary/20">
            <PenTool className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Yazılarım</h1>
          <p className="text-white/50 text-lg">Teknoloji, yazılım ve fikirlerim üzerine ufak notlar.</p>
        </div>

        <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-6 md:p-10 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col gap-6">
            {posts.length === 0 ? (
              <p className="text-white/40 text-center py-12">Henüz yazı yok...</p>
            ) : (
              posts.map((post:any)  => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="block">
                  <PostCard post={post} />
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
