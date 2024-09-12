-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TEACHER', 'STUDENT');

-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "prenent" BOOLEAN NOT NULL DEFAULT false;
