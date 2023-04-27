import { IconFeather } from "@tabler/icons-react";
import Link from "next/link";

export function NavbarShell({ children }: { children?: React.ReactNode }) {
  return (
    <div className="border-b border-zinc-800 bg-zinc-900/75">
      <div className="mx-auto flex h-16 max-w-6xl justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <IconFeather size={28} />
          <h1 className="text-2xl font-bold">Buoyancy</h1>
        </Link>

        {children}
      </div>
    </div>
  );
}
