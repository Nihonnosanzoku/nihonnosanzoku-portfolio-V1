import { prisma } from '../config/prisma.config';

export default class SettingsRepository {
  async getGlobalSettings() {
    return await prisma.siteSettings.findUnique({
      where: { id: 'global' },
    });
  }

  async updateSettings(data: any) {
    return await prisma.siteSettings.upsert({
      where: { id: 'global' },
      update: data,
      create: { id: 'global', ...data },
    });
  }
}
