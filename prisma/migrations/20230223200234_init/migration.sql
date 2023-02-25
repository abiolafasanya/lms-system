/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Grade` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Grade` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_userId_fkey";

-- AlterTable
ALTER TABLE "Grade" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Grade_userId_key" ON "Grade"("userId");

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
