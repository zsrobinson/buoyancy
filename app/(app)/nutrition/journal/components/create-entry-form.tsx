"use client";

import { Meal } from "@prisma/client";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useZact } from "zact/client";
import { createEntry } from "../action";
import { useEffect, useRef } from "react";

export function CreateEntryForm({
  action,
  meal,
}: {
  action: typeof createEntry;
  meal: Meal;
}) {
  const { mutate, data, isLoading, error } = useZact(action);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data && !error) {
      formRef.current?.reset();
      nameInputRef.current?.focus();
    }
  }, [data, error]);

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const { name, calories } = Object.fromEntries(formData) as {
            name: string;
            calories: string;
          };

          await mutate({ name, calories: Number(calories), meal });
          router.refresh();
        }}
        className="flex items-center gap-2 pl-4"
        ref={formRef}
      >
        <IconPlus size={12} stroke={4} />

        <input
          type="text"
          placeholder="Name"
          className="rounded-lg bg-zinc-800/40 px-3 py-1 placeholder-zinc-500 transition hover:bg-zinc-800/80 focus:border-zinc-200 focus:bg-zinc-800/90 focus:outline-none"
          name="name"
          disabled={isLoading}
          ref={nameInputRef}
        />

        <input
          type="number"
          placeholder="Calories"
          className="rounded-lg bg-zinc-800/40 px-3 py-1 placeholder-zinc-500 transition hover:bg-zinc-800/80 focus:border-zinc-200 focus:bg-zinc-800/90 focus:outline-none"
          name="calories"
          disabled={isLoading}
        />

        <button
          type="submit"
          className="rounded-lg bg-zinc-800/40 px-3 py-1 text-zinc-500 transition hover:bg-zinc-800/80 hover:text-zinc-300 focus:bg-zinc-800/80 focus:outline-none"
          disabled={isLoading}
        >
          Add
        </button>
      </form>

      {error && (
        <span className="grow-0 text-xs text-red-300">
          Error creating entry: {error.message}
        </span>
      )}
    </>
  );
}
