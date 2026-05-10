'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/server/auth/auth';
import { uploadFile } from '@/server/utils/file';
import GalleryRepository from '@/server/gallery/gallery.repository';
import BlogRepository from '@/server/blog/blog.repository';

const galleryRepository = new GalleryRepository();
const blogRepository = new BlogRepository();

export async function addGalleryItem(formData: FormData) {
    const file = (formData.get('image') || formData.get('file')) as File;
    const urlInput = formData.get('url') as string;
    const alt = formData.get('alt') as string;
    const roleIds = formData.getAll('allowedRoles') as string[];
    
    let url = '';
    if (file && file.size > 0) {
        const uploadedUrl = await uploadFile(file);
        if (uploadedUrl) url = uploadedUrl;
    } else if (urlInput) {
        url = urlInput;
    }

    if (!url) throw new Error('Medya gerekli');

    await galleryRepository.addImage(url, alt, roleIds);
    revalidatePath('/');
    revalidatePath('/galeri');
}

export async function addBlogPost(formData: FormData) {
    const session = await auth();
    if (!session?.user) throw new Error('Yetkisiz erişim');

    // Basic blog add logic - assuming BlogForm sends title, slug, content
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const published = formData.get('published') === 'on' || formData.get('published') === 'true';
    const authorId = (session.user as any).id;

    if(!title || !content || !authorId) throw new Error('Eksik bilgi');

    await blogRepository.createPost(
        title,
        content,
        title.toLowerCase().replace(/ /g, '-'),
        published,
        authorId
    );
    revalidatePath('/');
    revalidatePath('/blog');
}
