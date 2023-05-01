import { z } from "zod";

const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

export function getUser(): User {
  const res = localStorage.getItem("user");

  if (!res) {
    localStorage.setItem("user", JSON.stringify({ id: crypto.randomUUID() }));
    return getUser();
  }

  return userSchema.parse(JSON.parse(res));
}

export async function updateUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}
