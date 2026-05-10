import MusicRepository from '@/server/music/music.repository';
import { revalidatePath } from 'next/cache';
import MusicManager from '@/components/admin/music/MusicManager';

const musicRepository = new MusicRepository();

export default async function MusicPage() {
  const songs = await musicRepository.getAllSongs();

  const addSong = async (formData: FormData) => {
    'use server';
    
    let platform = formData.get('platform') as string;
    const link = formData.get('link') as string;
    
    if (platform === 'Auto') {
      if (link.includes('spotify.com')) platform = 'Spotify';
      else if (link.includes('youtu.be') || link.includes('youtube.com')) platform = 'YouTube';
      else platform = 'Diğer';
    }

    await musicRepository.addSong(
      formData.get('title') as string,
      formData.get('artist') as string,
      link,
      platform,
      formData.get('coverUrl') as string,
      formData.get('videoUrl') as string
    );
    revalidatePath('/');
    revalidatePath('/admin/music');
  };

  const updateSong = async (formData: FormData) => {
    'use server';
    const id = formData.get('id') as string;
    let platform = formData.get('platform') as string;
    const link = formData.get('link') as string;
    
    if (platform === 'Auto') {
      if (link.includes('spotify.com')) platform = 'Spotify';
      else if (link.includes('youtu.be') || link.includes('youtube.com')) platform = 'YouTube';
      else platform = 'Diğer';
    }

    await musicRepository.updateSong(
      id,
      formData.get('title') as string,
      formData.get('artist') as string,
      link,
      platform,
      formData.get('coverUrl') as string,
      formData.get('videoUrl') as string
    );
    revalidatePath('/');
    revalidatePath('/admin/music');
  };

  const deleteSong = async (formData: FormData) => {
    'use server';
    await musicRepository.deleteSong(formData.get('id') as string);
    revalidatePath('/');
    revalidatePath('/admin/music');
  };

  return (
    <MusicManager 
      songs={songs} 
      addSongAction={addSong} 
      updateSongAction={updateSong} 
      deleteSongAction={deleteSong} 
    />
  );
}
