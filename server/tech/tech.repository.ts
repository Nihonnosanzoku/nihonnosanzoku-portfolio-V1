import { prisma } from '../config/prisma.config';

export default class TechRepository {
  async getAllTech() {
    return await prisma.techStack.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async addTech(name: string, iconName: string, iconSvg?: string, color?: string) {
    return await prisma.techStack.create({
      data: { name, iconName, iconSvg, color },
    });
  }

  async deleteTech(id: string) {
    return await prisma.techStack.delete({
      where: { id },
    });
  }

  async updateTech(id: string, name: string, iconName: string, iconSvg?: string, color?: string) {
    return await prisma.techStack.update({
      where: { id },
      data: { name, iconName, iconSvg, color },
    });
  }
}
