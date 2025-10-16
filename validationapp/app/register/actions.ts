"use server";

import { registerUser } from "../services/userService";

export async function registerAction(formData: FormData) {
  return await registerUser({
    email: String(formData.get("email")),
    name: String(formData.get("name")),
    password: String(formData.get("password")),
  });
}
