import { IconLoader2 } from "@tabler/icons-react";

export function BasicLoadingScreen() {
  return (
    <div className="flex items-center justify-center gap-2 text-zinc-500">
      <IconLoader2 className="animate-spin" />
      <span>Loading...</span>
    </div>
  );
}
