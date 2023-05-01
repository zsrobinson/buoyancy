"use client";

import { IconPlus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Meal, addNutritionJournalEntry } from "~/lib/nutrition-journal";

export function CreateEntryForm({ meal }: { meal: Meal }) {
  const queryClient = useQueryClient();

  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: addNutritionJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries(["nutritionJournalEntries"]);
      if (formRef.current) formRef.current.reset();
      if (nameInputRef.current) nameInputRef.current.focus();
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const { name, calories } = Object.fromEntries(formData) as {
            name: string;
            calories: string;
          };

          mutate({
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            name,
            meal,
            calories: Number(calories),
          });
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

      {isError && (
        <span className="grow-0 text-xs text-red-300">
          Error creating entry
        </span>
      )}
    </>
  );
}
