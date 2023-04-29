import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/app-beta";
import { Meal, NutritionJournalEntry } from "@prisma/client";
import { createEntry, removeEntry } from "./action";
import { CreateEntryForm } from "./create-entry-form";
import { RemoveEntryButton } from "./remove-entry-button";

export default async function Page() {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated.");

  const entries = await prisma.nutritionJournalEntry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="flex flex-col gap-4">
      {Object.values(Meal).map((meal) => (
        <MealSection
          key={meal}
          meal={meal}
          entries={entries.filter((entry) => entry.meal === meal)}
        />
      ))}
    </div>
  );
}

function MealSection({
  meal,
  entries,
}: {
  meal: Meal;
  entries: NutritionJournalEntry[];
}) {
  const calorieSum = entries.reduce((sum, entry) => sum + entry.calories, 0);

  return (
    <div key={meal} className="flex flex-col gap-2">
      <div className="flex items-end gap-2">
        <h1 className="text-2xl font-bold">
          {meal.slice(0, 1).toUpperCase() + meal.slice(1).toLowerCase()}
        </h1>
        <span className="pb-0.5 italic text-zinc-500">
          {calorieSum} calories
        </span>
      </div>

      {entries.length > 0 && (
        <ul className="list-inside list-disc pl-4">
          {entries
            .filter((entry) => entry.meal === meal)
            .map((entry) => (
              <div className="flex gap-2" key={entry.id}>
                <li>
                  {entry.name}, {entry.calories} calories
                </li>

                <RemoveEntryButton action={removeEntry} entryId={entry.id} />
              </div>
            ))}
        </ul>
      )}

      <CreateEntryForm action={createEntry} meal={meal} />
    </div>
  );
}
