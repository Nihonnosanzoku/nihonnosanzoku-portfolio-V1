import BlogService from '@/server/blog/blog.service';
import AuthRepository from '@/server/auth/auth.repository';
import { revalidatePath } from 'next/cache';
import { auth } from '@/server/auth/auth';
import BlogManager from '@/components/admin/blog/BlogManager';

const blogService = new BlogService();
const authRepository = new AuthRepository();

export default async function BlogPage() {
  const posts = await blogService.getAllPosts();
  const session = await auth();

  const addPost = async (formData: FormData) => {
    'use server';
    const author = await authRepository.findUserByEmail(session?.user?.email!);
    
    await blogService.createPost({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      published: formData.get('published') === 'true',
    }, author?.id!);
    
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
  };

  const updatePost = async (formData: FormData) => {
    'use server';
    const id = formData.get('id') as string;
    
    await blogService.updatePost(
      id,
      formData.get('title') as string,
      formData.get('content') as string,
      formData.get('published') === 'true'
    );
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
  };

  const deletePost = async (formData: FormData) => {
    'use server';
    await blogService.deletePost(formData.get('id') as string);
    revalidatePath('/admin/blog');
    revalidatePath('/blog');
  };

  return (
    <BlogManager 
      posts={posts} 
      addPostAction={addPost} 
      updatePostAction={updatePost} 
      deletePostAction={deletePost} 
    />
  );
}
