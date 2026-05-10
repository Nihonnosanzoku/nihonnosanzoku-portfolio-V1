import { prisma } from "../config/prisma.config";

export default class RoleRepository {
  async getAllRoles() {
    return await prisma.userRole.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { users: true, gallery: true }
        }
      }
    });
  }

  async createRole(name: string, description?: string) {
    return await prisma.userRole.create({
      data: { name, description }
    });
  }

  async updateRole(id: string, name: string, description?: string) {
    return await prisma.userRole.update({
      where: { id },
      data: { name, description }
    });
  }

  async deleteRole(id: string) {
    return await prisma.userRole.delete({
      where: { id }
    });
  }

  async findRoleByName(name: string) {
    return await prisma.userRole.findUnique({
      where: { name }
    });
  }
}
