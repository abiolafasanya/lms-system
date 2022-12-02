/*
  Warnings:

  - You are about to drop the column `score` on the `Assessment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Assessment" DROP COLUMN "score",
ADD COLUMN     "description" TEXT;
