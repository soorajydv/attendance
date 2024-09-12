/*
  Warnings:

  - A unique constraint covering the columns `[inst_id]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roll_no]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attendance_inst_id_key" ON "Attendance"("inst_id");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_roll_no_key" ON "Attendance"("roll_no");
