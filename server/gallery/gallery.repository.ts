import { prisma } from '../config/prisma.config';

export default class GalleryRepository {
  async getAllImages() {
    return await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
      include: { allowedRoles: true }
    });
  }

  async addImage(url: string, alt: string, roleIds: string[] = []) {
    return await prisma.gallery.create({
      data: { 
        url, 
        alt,
        allowedRoles: {
          connect: roleIds.map(id => ({ id }))
        }
      },
    });
  }

  async deleteImage(id: string) {
    return await prisma.gallery.delete({
      where: { id },
    });
  }

  async updateImage(id: string, url: string, alt: string, roleIds: string[] = []) {
    return await prisma.gallery.update({
      where: { id },
      data: { 
        url, 
        alt,
        allowedRoles: {
          set: roleIds.map(id => ({ id }))
        }
      },
    });
  }
}
