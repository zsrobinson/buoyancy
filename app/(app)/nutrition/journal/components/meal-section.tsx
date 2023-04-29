import { Meal, NutritionJournalEntry } from "@prisma/client";
import { removeEntry, createEntry } from "../action";
import { CreateEntryForm } from "./create-entry-form";
import {
  RemoveEntryButton,
  RemoveEntryButtonSkeleton,
} from "./remove-entry-button";
import { IconPointFilled } from "@tabler/icons-react";

export function MealSection({
  meal,
  entries,
}: {
  meal: Meal;
  entries: NutritionJournalEntry[];
}) {
  const calorieSum = entries.reduce((sum, entry) => sum + entry.calories, 0);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end gap-2">
        <h1 className="text-2xl font-bold">
          {meal.slice(0, 1).toUpperCase() + meal.slice(1).toLowerCase()}
        </h1>
        <span className="pb-0.5 italic text-zinc-500">
          {calorieSum} calories
        </span>
      </div>

      {entries.length > 0 && (
        <div className="flex flex-col gap-1 pl-4">
          {entries
            .filter((entry) => entry.meal === meal)
            .map((entry) => (
              <div className="flex items-center gap-2" key={entry.id}>
                <IconPointFilled size={12} />

                <span>
                  {entry.name}, {entry.calories} calories
                </span>

                <RemoveEntryButton action={removeEntry} entryId={entry.id} />
              </div>
            ))}
        </div>
      )}

      <CreateEntryForm action={createEntry} meal={meal} />
    </div>
  );
}

export function MealSectionSkelton({ meal }: { meal: Meal }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end gap-2">
        <h1 className="text-2xl font-bold">
          {meal.slice(0, 1).toUpperCase() + meal.slice(1).toLowerCase()}
        </h1>
        <div className="mb-1.5 h-4 w-20 animate-pulse rounded-lg bg-zinc-900"></div>
      </div>

      <div className="flex flex-col gap-1 pl-4">
        {Array.from(Array(2)).map((_, i) => (
          <div className="flex items-center gap-2" key={i}>
            <IconPointFilled size={12} />
            <div className="h-6 w-48 animate-pulse rounded-lg bg-zinc-900"></div>
            <RemoveEntryButtonSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
