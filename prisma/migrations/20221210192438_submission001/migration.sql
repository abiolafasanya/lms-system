-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "regraded" BOOLEAN NOT NULL DEFAULT false;
