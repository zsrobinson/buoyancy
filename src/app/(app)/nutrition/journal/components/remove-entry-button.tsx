"use client";

import { IconX } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeNutritionJournalEntry } from "~/lib/nutrition";

export function RemoveEntryButton({ entryId }: { entryId: string }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: removeNutritionJournalEntry,
    onSuccess: () => queryClient.invalidateQueries(["nutritionJournalEntries"]),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate(entryId);
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

export function RemoveEntryButtonSkeleton() {
  return (
    <div className="flex items-center">
      <IconX
        size={16}
        className="text-zinc-500 transition hover:text-zinc-300"
      />
    </div>
  );
}
