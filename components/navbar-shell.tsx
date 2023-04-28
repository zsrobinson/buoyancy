import { IconFeather } from "@tabler/icons-react";
import Link from "next/link";

export function NavbarShell({
  children,
  linkToDashboard = false,
}: {
  children?: React.ReactNode;
  linkToDashboard?: boolean;
}) {
  return (
    <div className="border-b border-zinc-800 bg-zinc-900/75">
      <div className="mx-auto flex h-16 justify-between px-8 py-4">
        <Link
          href={linkToDashboard ? "/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          <IconFeather size={28} />
          <h1 className="text-2xl font-bold">Buoyancy</h1>
        </Link>

        {children}
      </div>
    </div>
  );
}
