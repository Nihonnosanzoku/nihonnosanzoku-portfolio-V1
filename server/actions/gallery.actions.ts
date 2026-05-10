'use server';

import { revalidatePath } from 'next/cache';
import { uploadFile } from '@/server/utils/file';
import GalleryRepository from '@/server/gallery/gallery.repository';

const galleryRepository = new GalleryRepository();

export async function addImageAction(formData: FormData) {
    try {
        console.log('[GalleryAction] addImageAction started');
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
        revalidatePath('/admin/gallery');
    } catch (error) {
        console.error('[GalleryAction Error]', error);
        throw error;
    }
}

export async function updateImageAction(formData: FormData) {
    try {
        console.log('[GalleryAction] updateImageAction started');
        const id = formData.get('id') as string;
        const file = (formData.get('image') || formData.get('file')) as File;
        let url = formData.get('url') as string;
        const alt = formData.get('alt') as string;
        const roleIds = formData.getAll('allowedRoles') as string[];

        if (file && file.size > 0) {
            const uploadedUrl = await uploadFile(file);
            if (uploadedUrl) url = uploadedUrl;
        }
        
        await galleryRepository.updateImage(id, url, alt, roleIds);

        revalidatePath('/');
        revalidatePath('/galeri');
        revalidatePath('/admin/gallery');
    } catch (error) {
        console.error('[GalleryAction Update Error]', error);
        throw error;
    }
}

export async function deleteImageAction(formData: FormData) {
    try {
        const id = formData.get('id') as string;
        await galleryRepository.deleteImage(id);
        revalidatePath('/');
        revalidatePath('/galeri');
        revalidatePath('/admin/gallery');
    } catch (error) {
        console.error('[GalleryAction Delete Error]', error);
        throw error;
    }
}
