import TechRepository from '@/server/tech/tech.repository';
import { revalidatePath } from 'next/cache';
import { uploadFile } from '@/server/utils/file';
import TechManager from '@/components/admin/tech/TechManager';

const techRepository = new TechRepository();

export default async function TechPage() {
  const techs = await techRepository.getAllTech();

  const addTech = async (formData: FormData) => {
    'use server';
    
    const iconFile = formData.get('iconFile') as File;
    let iconPath = formData.get('iconSvg') as string;

    if (iconFile && iconFile.size > 0) {
      const uploadedPath = await uploadFile(iconFile);
      if (uploadedPath) {
        iconPath = uploadedPath;
      }
    }

    await techRepository.addTech(
      formData.get('name') as string,
      "Custom",
      iconPath,
      formData.get('color') as string
    );
    revalidatePath('/');
    revalidatePath('/admin/tech');
  };

  const updateTech = async (formData: FormData) => {
    'use server';
    const id = formData.get('id') as string;
    const iconFile = formData.get('iconFile') as File;
    let iconPath = formData.get('iconSvg') as string;

    if (iconFile && iconFile.size > 0) {
      const uploadedPath = await uploadFile(iconFile);
      if (uploadedPath) {
        iconPath = uploadedPath;
      }
    }

    await techRepository.updateTech(
      id,
      formData.get('name') as string,
      "Custom",
      iconPath,
      formData.get('color') as string
    );
    revalidatePath('/');
    revalidatePath('/admin/tech');
  };

  const deleteTech = async (formData: FormData) => {
    'use server';
    await techRepository.deleteTech(formData.get('id') as string);
    revalidatePath('/');
    revalidatePath('/admin/tech');
  };

  return (
    <TechManager 
      techs={techs} 
      addTechAction={addTech} 
      updateTechAction={updateTech} 
      deleteTechAction={deleteTech} 
    />
  );
}
