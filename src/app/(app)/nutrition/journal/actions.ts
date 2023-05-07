"use server";

import { z } from "zod";
import { zact } from "zact/server";
import { db } from "~/lib/db";
import { getCurrentUser } from "~/lib/auth";
import { revalidatePath } from "next/cache";

const createEntryInput = z.object({
  name: z.string(),
  calories: z.number().min(0),
  date: z.string().datetime(),
  meal: z.enum(["BREAKFAST", "LUNCH", "DINNER", "SNACKS"]),
});

export const createEntry = zact(createEntryInput)(
  async ({ name, calories, date, meal }) => {
    const user = await getCurrentUser();
    const entry = await db.nutritionJournalEntry.create({
      data: {
        name,
        calories,
        date,
        meal,
        userId: user.id,
      },
    });

    revalidatePath("/nutrition/journal");
    return { entry };
  }
);

export const deleteEntry = zact(z.object({ id: z.string() }))(
  async ({ id }) => {
    const user = await getCurrentUser();
    await db.nutritionJournalEntry.deleteMany({
      where: { userId: user.id, id: id },
    });

    revalidatePath("/nutrition/journal");
  }
);
