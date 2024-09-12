/*
  Warnings:

  - You are about to drop the column `password` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roll_no]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inst_id]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inst_id` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roll_no` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_inst_id_fkey";

-- DropIndex
DROP INDEX "Attendance_roll_no_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "password",
ADD COLUMN     "inst_id" INTEGER NOT NULL,
ADD COLUMN     "roll_no" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_roll_no_key" ON "Users"("roll_no");

-- CreateIndex
CREATE UNIQUE INDEX "Users_inst_id_key" ON "Users"("inst_id");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_inst_id_fkey" FOREIGN KEY ("inst_id") REFERENCES "Users"("inst_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_roll_no_fkey" FOREIGN KEY ("roll_no") REFERENCES "Users"("roll_no") ON DELETE RESTRICT ON UPDATE CASCADE;
