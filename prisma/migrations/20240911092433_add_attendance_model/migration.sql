-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "roll_no" INTEGER NOT NULL,
    "inst_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_roll_no_key" ON "Attendance"("roll_no");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_inst_id_fkey" FOREIGN KEY ("inst_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
