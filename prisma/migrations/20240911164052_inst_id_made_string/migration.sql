-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_inst_id_fkey";

-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "inst_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "inst_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_inst_id_fkey" FOREIGN KEY ("inst_id") REFERENCES "Users"("inst_id") ON DELETE RESTRICT ON UPDATE CASCADE;
