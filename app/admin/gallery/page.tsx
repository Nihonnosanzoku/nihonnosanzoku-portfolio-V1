import GalleryRepository from '@/server/gallery/gallery.repository';
import { revalidatePath } from 'next/cache';
import { uploadFile } from '@/server/utils/file';
import GalleryManager from '@/components/admin/gallery/GalleryManager';
import RoleRepository from '@/server/roles/role.repository';

const galleryRepository = new GalleryRepository();
const roleRepository = new RoleRepository();

export default async function GalleryPage() {
  const images = await galleryRepository.getAllImages();
  const roles = await roleRepository.getAllRoles();

  const addImage = async (formData: FormData) => {
    'use server';
    const file = formData.get('image') as File;
    const url = await uploadFile(file);
    const roleIds = formData.getAll('allowedRoles') as string[];
    
    if (url) {
      await galleryRepository.addImage(
        url,
        formData.get('alt') as string,
        roleIds
      );
    }
    revalidatePath('/');
    revalidatePath('/admin/gallery');
  };

  const updateImage = async (formData: FormData) => {
    'use server';
    const id = formData.get('id') as string;
    const file = formData.get('image') as File;
    let url = formData.get('url') as string;
    const roleIds = formData.getAll('allowedRoles') as string[];

    if (file && file.size > 0) {
      const uploadedUrl = await uploadFile(file);
      if (uploadedUrl) url = uploadedUrl;
    }
    
    await galleryRepository.updateImage(
      id,
      url,
      formData.get('alt') as string,
      roleIds
    );
    revalidatePath('/');
    revalidatePath('/admin/gallery');
  };

  const deleteImage = async (formData: FormData) => {
    'use server';
    await galleryRepository.deleteImage(formData.get('id') as string);
    revalidatePath('/');
    revalidatePath('/admin/gallery');
  };

  return (
    <GalleryManager 
      images={images as any} 
      roles={roles as any}
      addImageAction={addImage} 
      updateImageAction={updateImage} 
      deleteImageAction={deleteImage} 
    />
  );
}
