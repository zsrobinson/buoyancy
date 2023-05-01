import { z } from "zod";

export const meals = ["breakfast", "lunch", "dinner", "snacks"] as const;
export type Meal = (typeof meals)[number];

const nutritionJournalEntrySchema = z.object({
  id: z.string().uuid(),
  date: z.string().datetime(),
  name: z.string().min(1),
  meal: z.enum(meals),

  calories: z.number().min(0),
  protein: z.number().min(0).optional(),
  carbs: z.number().min(0).optional(),
  fat: z.number().min(0).optional(),
});

export type NutritionJournalEntry = z.infer<typeof nutritionJournalEntrySchema>;

export function getNutritionJournalEntries(): NutritionJournalEntry[] {
  const res = localStorage.getItem("nutritionJournalEntries");

  if (!res) {
    localStorage.setItem("nutritionJournalEntries", JSON.stringify([]));
    return getNutritionJournalEntries();
  }

  return nutritionJournalEntrySchema.array().parse(JSON.parse(res));
}

export async function addNutritionJournalEntry(entry: NutritionJournalEntry) {
  const entries = getNutritionJournalEntries();
  entries.push(nutritionJournalEntrySchema.parse(entry));
  localStorage.setItem("nutritionJournalEntries", JSON.stringify(entries));
}

export async function removeNutritionJournalEntry(id: string) {
  const entries = getNutritionJournalEntries();
  const newEntries = entries.filter((entry) => entry.id !== id);
  localStorage.setItem("nutritionJournalEntries", JSON.stringify(newEntries));
}
