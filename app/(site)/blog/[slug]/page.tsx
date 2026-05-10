import React from 'react';
import { notFound } from 'next/navigation';
import BlogService from '@/server/blog/blog.service';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

const blogService = new BlogService();

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const posts = await blogService.getAllPublishedPosts();
  const post = posts.find((p: any) => p.slug === slug);
  
  return {
    title: post ? `${post.title} | Nihonnosanzoku` : 'Blog Yazısı',
    description: post ? post.content.slice(0, 160) : 'Blog yazısı detayları.',
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await blogService.getAllPublishedPosts();
  const post = posts.find((p: any) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-foreground relative p-4 md:p-12 overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-black to-black opacity-80 pointer-events-none"></div>
      
      <article className="relative z-10 w-full max-w-3xl mt-12 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-2xl shadow-2xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Yazılara Geri Dön
        </Link>

        <header className="mb-8 pb-8 border-b border-white/5">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap gap-6 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              {new Date(post.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              {post.author?.name || 'Admin'}
            </div>
          </div>
        </header>

        <div className="prose prose-invert max-w-none prose-p:text-white/70 prose-headings:text-white prose-a:text-primary hover:prose-a:underline prose-img:rounded-3xl prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
          {post.content.split('\n').map((para: string, i: number) => (
            <p key={i} className="mb-4 leading-relaxed">{para}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
