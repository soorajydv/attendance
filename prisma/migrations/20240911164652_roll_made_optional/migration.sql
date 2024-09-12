-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_inst_id_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_roll_no_fkey";

-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "roll_no" DROP NOT NULL,
ALTER COLUMN "inst_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_inst_id_fkey" FOREIGN KEY ("inst_id") REFERENCES "Users"("inst_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_roll_no_fkey" FOREIGN KEY ("roll_no") REFERENCES "Users"("roll_no") ON DELETE SET NULL ON UPDATE CASCADE;
