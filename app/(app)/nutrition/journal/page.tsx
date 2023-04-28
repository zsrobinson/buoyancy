import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/app-beta";
import { CreateEntryForm } from "./create-entry-form";
import { createEntry, removeEntry } from "./action";
import { RemoveEntryButton } from "./remove-entry-button";

export default async function Page() {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated.");

  const data = await prisma.nutritionJournalEntry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="flex flex-col gap-2">
      {data.map((entry) => (
        <div className="flex items-center gap-2" key={entry.id}>
          <span>
            {entry.name}, {entry.calories} calories
          </span>
          <RemoveEntryButton action={removeEntry} entryId={entry.id} />
        </div>
      ))}
      <CreateEntryForm action={createEntry} />
    </div>
  );
}
