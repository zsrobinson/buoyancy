import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/app-beta";
import { Meal } from "@prisma/client";
import { MealSection } from "./components/meal-section";

export default async function Page() {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated.");

  const entries = await prisma.nutritionJournalEntry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

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
