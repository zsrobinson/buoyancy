"use client";

import { useQuery } from "@tanstack/react-query";
import { NavbarShell } from "~/components/navbar-shell";
import { getUser } from "~/lib/user";
import { Sidebar } from "./sidebar";
import { IconUser } from "@tabler/icons-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-zinc-950 to-zinc-900/50">
      <NavbarShell linkToDashboard>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end justify-center">
            <span className="text-sm font-semibold text-zinc-200">
              {user.data?.name}
            </span>
            <span className="font-mono text-xs text-zinc-500">
              {user.data?.id}
            </span>
          </div>

          <Button variant="outline" className="px-2" asChild>
            <Link href="/settings">
              <IconUser />
            </Link>
          </Button>
        </div>
      </NavbarShell>
      <div className="flex grow">
        <Sidebar />
        <div className="mx-auto max-w-6xl grow p-8">{children}</div>
      </div>
    </div>
  );
}
