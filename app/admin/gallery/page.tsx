import GalleryRepository from '@/server/gallery/gallery.repository';
import GalleryManager from '@/components/admin/gallery/GalleryManager';
import RoleRepository from '@/server/roles/role.repository';
import { addImageAction, updateImageAction, deleteImageAction } from '@/server/actions/gallery.actions';

const galleryRepository = new GalleryRepository();
const roleRepository = new RoleRepository();

export default async function GalleryPage() {
  const images = await galleryRepository.getAllImages();
  const roles = await roleRepository.getAllRoles();

  return (
    <GalleryManager 
      images={images as any} 
      roles={roles as any}
      addImageAction={addImageAction} 
      updateImageAction={updateImageAction} 
      deleteImageAction={deleteImageAction} 
    />
  );
}
