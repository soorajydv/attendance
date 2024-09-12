/*
  Warnings:

  - You are about to drop the column `prenent` on the `Attendance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "prenent",
ADD COLUMN     "present" BOOLEAN NOT NULL DEFAULT false;
