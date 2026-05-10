import SettingsRepository from '@/server/settings/settings.repository';
import { revalidatePath } from 'next/cache';
import SettingsManager from '@/components/admin/settings/SettingsManager';

const settingsRepository = new SettingsRepository();

export default async function SettingsPage() {
  const settings = await settingsRepository.getGlobalSettings();

  const updateSettings = async (formData: FormData) => {
    'use server';
    
    await settingsRepository.updateSettings({
      heroTitle: formData.get('heroTitle') as string,
      heroBio: formData.get('heroBio') as string,
      githubLink: formData.get('githubLink') as string,
      discordLink: formData.get('discordLink') as string,
      spotifyLink: formData.get('spotifyLink') as string,
      anilistLink: formData.get('anilistLink') as string,
    });

    revalidatePath('/');
    revalidatePath('/admin/settings');
  };

  return (
    <SettingsManager settings={settings} updateAction={updateSettings} />
  );
}
