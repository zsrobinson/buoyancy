import { NavbarShell } from "~/components/navbar-shell";
import { Sidebar } from "./sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AvatarButton } from "./avatar-button";

type LayoutProps = { children: React.ReactNode };

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/api/auth/signin");

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-950 to-zinc-900/50">
      <NavbarShell linkToDashboard>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end justify-center">
            <span className="text-sm font-semibold text-zinc-200">
              {session.user.name}
            </span>
            <span className="font-mono text-xs text-zinc-500">
              {session.user.email}
            </span>
          </div>

          <AvatarButton user={session.user} />
        </div>
      </NavbarShell>

      <div className="flex grow">
        <Sidebar />
        <div className="mx-auto max-w-6xl grow p-8 pb-64">{children}</div>
      </div>
    </div>
  );
}
