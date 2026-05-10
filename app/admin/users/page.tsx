import React from 'react';
import AuthRepository from '@/server/auth/auth.repository';
import { revalidatePath } from 'next/cache';
import { auth } from '@/server/auth/auth';
import UsersManager from '@/components/admin/users/UsersManager';
import RoleRepository from '@/server/roles/role.repository';

const authRepository = new AuthRepository();
const roleRepository = new RoleRepository();

export default async function UsersPage() {
  const users = await authRepository.getAllUsers();
  const roles = await roleRepository.getAllRoles();
  const session = await auth();
  
  // Find current admin's discordId to prevent self-deletion
  const currentAdmin = await authRepository.findUserByEmail(session?.user?.email!);

  const addUser = async (formData: FormData) => {
    'use server';
    const roleIds = formData.getAll('roles') as string[];
    await authRepository.createUser({
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      discordId: formData.get('discordId') as string,
      role: formData.get('role') as any, // System role (ADMIN/USER)
      isApproved: formData.get('isApproved') === 'true',
      roleIds: roleIds
    });
    revalidatePath('/admin/users');
  };

  const updateUser = async (formData: FormData) => {
    'use server';
    const id = formData.get('id') as string;
    const roleIds = formData.getAll('roles') as string[];
    await authRepository.updateUser(id, {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      discordId: formData.get('discordId') as string,
      role: formData.get('role') as any,
      isApproved: formData.get('isApproved') === 'true',
      roleIds: roleIds
    });
    revalidatePath('/admin/users');
  };

  const deleteUser = async (id: string) => {
    'use server';
    await authRepository.deleteUser(id);
    revalidatePath('/admin/users');
  };

  return (
    <UsersManager 
      users={users} 
      roles={roles as any}
      addUserAction={addUser} 
      updateUserAction={updateUser} 
      deleteUserAction={deleteUser} 
      adminDiscordId={currentAdmin?.discordId || ''}
    />
  );
}
