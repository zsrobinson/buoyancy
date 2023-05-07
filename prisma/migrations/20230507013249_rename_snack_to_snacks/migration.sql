/*
  Warnings:

  - The values [SNACK] on the enum `Meal` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Meal_new" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACKS');
ALTER TABLE "NutritionJournalEntry" ALTER COLUMN "meal" TYPE "Meal_new" USING ("meal"::text::"Meal_new");
ALTER TYPE "Meal" RENAME TO "Meal_old";
ALTER TYPE "Meal_new" RENAME TO "Meal";
DROP TYPE "Meal_old";
COMMIT;
