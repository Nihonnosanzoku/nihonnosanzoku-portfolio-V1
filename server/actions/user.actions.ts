"use server";

import AuthRepository from "@/server/auth/auth.repository";
import { revalidatePath } from "next/cache";

const authRepository = new AuthRepository();

export async function addUser(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as any;
  const isApproved = formData.get("isApproved") === "true";

  await authRepository.createUser({
    email,
    name,
    role,
    isApproved,
  });

  revalidatePath("/admin/users");
}

export async function deleteUser(id: string) {
  await authRepository.deleteUser(id);
  revalidatePath("/admin/users");
}

export async function updateUser(formData: FormData) {
  const id = formData.get("id") as string;
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as any;
  const isApproved = formData.get("isApproved") === "true";

  await authRepository.updateUser(id, {
    email,
    name,
    role,
    isApproved,
  });

  revalidatePath("/admin/users");
}
