import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { db } from "./db";
import { redirect } from "next/navigation";

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  throw new Error("Missing environment variables for GitHub OAuth");
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email)
    redirect("/api/auth/signin");

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) redirect("/api/auth/signin");
  return user;
}

export async function getCurrentSession() {
  return await getServerSession(authOptions);
}
