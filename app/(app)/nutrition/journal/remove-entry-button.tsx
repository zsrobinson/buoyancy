"use client";

import { IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useZact } from "zact/client";
import { removeEntry } from "./action";

export function RemoveEntryButton({
  action,
  entryId,
}: {
  action: typeof removeEntry;
  entryId: string;
}) {
  const { mutate } = useZact(action);
  const router = useRouter();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await mutate({ entryId });
        router.refresh();
      }}
      className="flex items-center"
    >
      <button type="submit">
        <IconX
          size={16}
          className="text-zinc-500 transition hover:text-zinc-300"
        />
      </button>
    </form>
  );
}
