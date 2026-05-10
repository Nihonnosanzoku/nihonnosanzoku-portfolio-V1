import { prisma } from '../config/prisma.config';

export default class MusicRepository {
  async getAllSongs() {
    return await prisma.song.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async addSong(title: string, artist: string, link: string, platform: string, coverUrl?: string, videoUrl?: string) {
    return await prisma.song.create({
      data: { title, artist, link, platform, coverUrl, videoUrl },
    });
  }

  async deleteSong(id: string) {
    return await prisma.song.delete({
      where: { id },
    });
  }

  async updateSong(id: string, title: string, artist: string, link: string, platform: string, coverUrl?: string, videoUrl?: string) {
    return await prisma.song.update({
      where: { id },
      data: { title, artist, link, platform, coverUrl, videoUrl },
    });
  }
}
