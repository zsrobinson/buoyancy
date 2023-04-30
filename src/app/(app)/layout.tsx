"use client";

import { NavbarShell } from "~/components/navbar-shell";
import { Sidebar } from "./sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-950 to-zinc-900/50">
        <NavbarShell linkToDashboard></NavbarShell>
        <div className="flex grow">
          <Sidebar />
          <div className="mx-auto max-w-6xl grow p-8">{children}</div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
