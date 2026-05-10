import React from 'react';
import RoleRepository from '@/server/roles/role.repository';
import { revalidatePath } from 'next/cache';
import RolesManager from '@/components/admin/roles/RolesManager';

const roleRepository = new RoleRepository();

export default async function RolesPage() {
  const roles = await roleRepository.getAllRoles();

  const addRole = async (formData: FormData) => {
    'use server';
    await roleRepository.createRole(
      formData.get('name') as string,
      formData.get('description') as string
    );
    revalidatePath('/admin/roles');
  };

  const updateRole = async (formData: FormData) => {
    'use server';
    const id = formData.get('id') as string;
    await roleRepository.updateRole(
      id,
      formData.get('name') as string,
      formData.get('description') as string
    );
    revalidatePath('/admin/roles');
  };

  const deleteRole = async (formData: FormData) => {
    'use server';
    await roleRepository.deleteRole(formData.get('id') as string);
    revalidatePath('/admin/roles');
  };

  return (
    <RolesManager 
      roles={roles as any} 
      addRoleAction={addRole} 
      updateRoleAction={updateRole} 
      deleteRoleAction={deleteRole} 
    />
  );
}
