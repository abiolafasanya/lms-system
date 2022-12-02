/*
  Warnings:

  - You are about to drop the column `assessmentId` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_assessmentId_fkey";

-- AlterTable
ALTER TABLE "Assessment" ADD COLUMN     "questionId" TEXT;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "assessmentId";

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
