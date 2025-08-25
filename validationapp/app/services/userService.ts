import { signUpSchema } from "../api/users/schema";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";

export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function createUser(data: {
  email: string;
  name: string;
  password: string;
}) {
  const { email, name: username, password } = data;

  await prisma.user.create({
    data: {
      email,
      name: username,
      passwordHash: await bcrypt.hash(password, 12),
    },
  });
}

export async function registerUser(data: {
  email: string;
  name: string;
  password: string;
}) {
  const parsed = signUpSchema.safeParse(data);

  if (!parsed.success) return { success: false, errors: parsed.error.issues };

  if (
    !(await prisma.user.findUnique({ where: { email: parsed.data.email } }))
  ) {
    await createUser(data);
  }

  return { success: false, errors: [] };
}
