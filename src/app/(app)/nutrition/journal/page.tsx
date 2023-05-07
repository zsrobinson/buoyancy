import { Meal } from "@prisma/client";
import { addDays, format, parse } from "date-fns";
import { getCurrentUser } from "~/lib/auth";
import { db } from "~/lib/db";
import { createEntry, deleteEntry } from "./actions";
import { MealSection } from "./meal-section";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: PageProps) {
  const date = searchParams.date
    ? parse((searchParams.date as string).replaceAll("-", "/"), "P", new Date())
    : parse(format(new Date(Date.now()), "P"), "P", new Date());

  const user = await getCurrentUser();
  const entries = await db.nutritionJournalEntry.findMany({
    where: { userId: user.id, date: { gte: date, lt: addDays(date, 1) } },
  });

  return (
    <>
      {Object.values(Meal).map((meal) => (
        <MealSection
          key={meal}
          meal={meal}
          createEntryAction={createEntry}
          deleteEntryAction={deleteEntry}
          entries={entries.filter((entry) => entry.meal === meal)}
        />
      ))}
    </>
  );
}
