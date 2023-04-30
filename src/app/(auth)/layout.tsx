import { NavbarShell } from "~/components/navbar-shell";
import { ThemedClerkProvider } from "~/components/themed-clerk-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemedClerkProvider>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-950 to-zinc-900/50">
        <NavbarShell />
        <div className="mx-auto max-w-6xl grow p-4 pt-8">{children}</div>
      </div>
    </ThemedClerkProvider>
  );
}
