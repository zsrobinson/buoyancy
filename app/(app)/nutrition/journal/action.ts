"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/app-beta";
import { zact } from "zact/server";
import { z } from "zod";

export const createEntry = zact(
  z.object({ name: z.string().nonempty(), calories: z.number().min(0) })
)(async ({ name, calories }) => {
  const user = await currentUser();
  if (!user) throw new Error("Not authenticated.");

  return await prisma.nutritionJournalEntry.create({
    data: { name, calories, userId: user.id },
  });
});

export const removeEntry = zact(z.object({ entryId: z.string() }))(
  async ({ entryId }) => {
    const user = await currentUser();
    if (!user) throw new Error("Not authenticated.");

    const entry = await prisma.nutritionJournalEntry.findFirst({
      where: { id: entryId, userId: user.id },
    });

    if (!entry) throw new Error("Entry not found.");

    return await prisma.nutritionJournalEntry.delete({
      where: { id: entry.id },
    });
  }
);
