import { Meal, NutritionJournalEntry } from "~/lib/nutrition-journal";
import { IconPointFilled } from "@tabler/icons-react";
import { CreateEntryForm } from "./create-entry-form";
import { RemoveEntryButton } from "./remove-entry-button";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export function MealSection({
  meal,
  entries,
}: {
  meal: Meal;
  entries: NutritionJournalEntry[];
}) {
  const calorieSum = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const [animateRef] = useAutoAnimate();

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

      <div className="flex flex-col gap-1 pl-4" ref={animateRef}>
        {entries
          .filter((entry) => entry.meal === meal)
          .map((entry) => (
            <div className="flex items-center gap-2" key={entry.id}>
              <IconPointFilled size={12} />

              <span>
                {entry.name}, {entry.calories} calories
              </span>

              <RemoveEntryButton entryId={entry.id} />
            </div>
          ))}
      </div>

      <CreateEntryForm meal={meal} />
    </div>
  );
}
