import { prisma } from '../config/prisma.config';

export default class AuthRepository {
  async findUserByEmail(email: string) {
    return await prisma.user.findFirst({
      where: { email },
      include: { roles: true }
    });
  }

  async getAdminProfile() {
    return await prisma.user.findFirst({
      where: { role: 'ADMIN' },
      select: { name: true, image: true, discordId: true, id: true, avatarDecoration: true }
    });
  }

  async getAllUsers() {
    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: { roles: true }
    });
  }

  async findUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: { roles: true }
    });
  }

  async createUser(data: { email: string; name: string; discordId?: string; role: 'USER' | 'ADMIN'; isApproved: boolean; roleIds?: string[] }) {
    const { roleIds, ...rest } = data;
    return await prisma.user.create({
      data: {
        ...rest,
        roles: roleIds ? {
          connect: roleIds.map(id => ({ id }))
        } : undefined
      },
      include: { roles: true }
    });
  }

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id }
    });
  }

  async updateUser(id: string, data: { email: string; name: string; discordId?: string; role: 'USER' | 'ADMIN'; isApproved: boolean; roleIds?: string[] }) {
    const { roleIds, ...rest } = data;
    return await prisma.user.update({
      where: { id },
      data: {
        ...rest,
        roles: {
          set: roleIds?.map(id => ({ id })) || []
        }
      },
      include: { roles: true }
    });
  }

  async createAdminUser(data: { email: string; name: string; image: string; discordId: string; globalName?: string; avatarDecoration?: string }) {
    return await prisma.user.create({
      data: {
        ...data,
        role: 'ADMIN',
        isApproved: true
      },
      include: { roles: true }
    });
  }

  async makeAdminAndApprove(userId: string, discordId: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        role: 'ADMIN',
        isApproved: true,
        discordId
      },
      include: { roles: true }
    });
  }

  async updateDiscordProfile(userId: string, name: string, image: string, discordId: string, globalName?: string, avatarDecoration?: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        image,
        discordId,
        globalName,
        avatarDecoration
      },
      include: { roles: true }
    });
  }

  async setStatus(userId: string, status: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: { lastStatus: status }
    });
  }
}
