"use client";

import { useQuery } from "@tanstack/react-query";
import { MealSection } from "./components/meal-section";
import { getNutritionJournalEntries, meals } from "~/lib/nutrition";
import { BasicLoadingScreen } from "~/components/basic-loading-screen";
import { BasicErrorScreen } from "~/components/basic-error-screen";

export default function Page() {
  const entries = useQuery({
    queryKey: ["nutritionJournalEntries"],
    queryFn: getNutritionJournalEntries,
  });

  if (entries.isLoading) return <BasicLoadingScreen />;
  if (entries.isError) return <BasicErrorScreen />;

  return (
    <div className="flex flex-col gap-4">
      {meals.map((meal) => (
        <MealSection
          key={meal}
          meal={meal}
          entries={entries.data.filter((entry) => entry.meal === meal)}
        />
      ))}
    </div>
  );
}
