/*
  Warnings:

  - You are about to drop the column `createdAt` on the `NutritionJournalEntry` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `NutritionJournalEntry` table. All the data in the column will be lost.
  - Added the required column `date` to the `NutritionJournalEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NutritionJournalEntry" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
