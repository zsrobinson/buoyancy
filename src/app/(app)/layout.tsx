import { AutoSignOut } from "~/components/auto-sign-out";
import { NavbarShell } from "~/components/navbar-shell";
import { ThemedClerkProvider } from "~/components/themed-clerk-provider";
import { UserButton } from "@clerk/nextjs/app-beta";
import { Sidebar } from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemedClerkProvider>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-950 to-zinc-900/50">
        <NavbarShell linkToDashboard>
          <AutoSignOut />
          <UserButton />
        </NavbarShell>
        <div className="flex grow">
          <Sidebar />
          <div className="mx-auto max-w-6xl grow p-8">{children}</div>
        </div>
      </div>
    </ThemedClerkProvider>
  );
}
