import { IconMoodConfuzed } from "@tabler/icons-react";

export function BasicErrorScreen() {
  return (
    <div className="flex items-center justify-center gap-2 text-red-400">
      <IconMoodConfuzed />
      <span>An Unexpected Error Has Occurred</span>
    </div>
  );
}
