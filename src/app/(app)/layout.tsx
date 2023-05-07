import { NavbarShell } from "~/components/navbar-shell";
import { getCurrentUser } from "~/lib/auth";
import { AvatarButton } from "./avatar-button";
import { Sidebar } from "./sidebar";

type LayoutProps = { children: React.ReactNode };

export default async function Layout({ children }: LayoutProps) {
  const user = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-950 to-zinc-900/50">
      <NavbarShell linkToDashboard>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end justify-center">
            <span className="text-sm font-semibold text-zinc-200">
              {user.name}
            </span>
            <span className="font-mono text-xs text-zinc-500">
              {user.email}
            </span>
          </div>

          <AvatarButton name={user.name ?? ""} image={user.image ?? ""} />
        </div>
      </NavbarShell>

      <div className="flex grow">
        <Sidebar />
        <div className="mx-auto max-w-6xl grow p-8 pb-64">{children}</div>
      </div>
    </div>
  );
}
