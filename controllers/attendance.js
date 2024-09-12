const prisma = require('../prisma/prisma')

class Attendance {

    async createStudentAttendance(req, res) {
        const rollNo = parseInt(req.params.id);
        const todayDate = new Date().toISOString().split('T')[0];

        try {
            const isPresent = await prisma.attendance.findFirst({
                where: {
                    roll_no: rollNo,
                },
            });

            if (!isPresent) {
                // If the student has no attendance record, create a new one
                const attendance = await prisma.attendance.create({
                    data: {
                        date: [todayDate],
                        student: {
                            connect: { roll_no: rollNo },
                        },
                    },
                });
                res.status(201).json(attendance);
            } else {
                if (isPresent.date.includes(todayDate)) {
                    return res.status(200).json({ message: "Student already present" });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    async createTeacherAttendance(req, res) {
        const inst_id = req.params.id
        const todayDate = new Date().toISOString().split('T')[0];

        try {
            const isPresent = await prisma.attendance.findFirst({
                where: {
                    inst_id: inst_id,
                },
            });

            if (!isPresent) {
                // If the teacher has no attendance record, create a new one
                const attendance = await prisma.attendance.create({
                    data: {
                        date: [todayDate],
                        teacher: {
                            connect: { inst_id: inst_id },
                        },
                    },
                });
                res.status(201).json(attendance);
            } else {
                if (isPresent.date.includes(todayDate)) {
                    return res.status(200).json({ message: " Teacher already present" });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }


    async updateStudentAttendance(req, res) {
        const rollNo = parseInt(req.params.id);
        const todayDate = new Date().toISOString().split('T')[0];

        try {

            const attendanceRecord = await prisma.attendance.findUnique({
                where: {
                    roll_no: rollNo
                }
            });

            if (attendanceRecord) {
                let attendanceDates = [];

                if (Array.isArray(attendanceRecord.date)) {
                    attendanceDates = attendanceRecord.date;
                } else {

                    try {
                        attendanceDates = JSON.parse(attendanceRecord.date);
                    } catch (error) {
                        console.error('Error parsing date:', error);
                        return res.status(500).json({ message: 'Invalid date format in attendance record.' });
                    }
                }

                // Check if today's date is in the date array
                const dateIndex = attendanceDates.indexOf(todayDate);

                if (dateIndex > -1) {
                    // If today's date exists, remove it
                    attendanceDates.splice(dateIndex, 1);
                } else {
                    // If today's date does not exist, add it
                    attendanceDates.push(todayDate);
                }


                const updatedAttendance = await prisma.attendance.update({
                    where: { roll_no: rollNo },
                    data: { date: attendanceDates }
                });

                res.status(200).json(updatedAttendance);
            } else {
                // Create a new attendance record if it doesn't exist
                const newAttendance = await prisma.attendance.create({
                    data: {
                        date: [todayDate],
                        student: {
                            connect: { roll_no: rollNo }
                        }
                    }
                });

                res.status(201).json(newAttendance);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    async updateTeacherAttendance(req, res) {
        const inst_id = req.params.id;
        const todayDate = new Date().toISOString().split('T')[0];

        try {

            const attendanceRecord = await prisma.attendance.findUnique({
                where: {
                    inst_id: inst_id
                }
            });

            if (attendanceRecord) {
                let attendanceDates = [];


                if (Array.isArray(attendanceRecord.date)) {
                    attendanceDates = attendanceRecord.date;
                } else {

                    try {
                        attendanceDates = JSON.parse(attendanceRecord.date);
                    } catch (error) {
                        console.error('Error parsing date:', error);
                        return res.status(500).json({ message: 'Invalid date format in attendance record.' });
                    }
                }

                // Check if today's date is in the date array
                const dateIndex = attendanceDates.indexOf(todayDate);

                if (dateIndex > -1) {
                    // If today's date exists, remove it
                    attendanceDates.splice(dateIndex, 1);
                } else {
                    // If today's date does not exist, add it
                    attendanceDates.push(todayDate);
                }


                const updatedAttendance = await prisma.attendance.update({
                    where: { inst_id: inst_id },
                    data: { date: attendanceDates }
                });

                res.status(200).json(updatedAttendance);
            } else {
                // Create a new attendance record if it doesn't exist
                const newAttendance = await prisma.attendance.create({
                    data: {
                        date: [todayDate],
                        student: {
                            connect: { inst_id: inst_id }
                        }
                    }
                });

                res.status(201).json(newAttendance);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    async deleteAttendance(req, res) {
        const id = parseInt(req.params.id)

        try {
            const deleted = await prisma.attendance.delete({
                where: {
                    id: id
                }
            })
            if (deleted) {
                res.status(200).json({ message: "Record deleted" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

    async getAttendanceList(req, res) {
        const { page, pageSize, username, rollNo, instId, sortBy = 'date', sortOrder = 'desc' } = req.query;

        try {
            const user = await prisma.users.findFirst({
                where: {
                    username: username
                }
            })

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const result = user.roll_no ? { roll_no: user.roll_no } : { inst_id: user.inst_id };

            const attendanceRecords = await prisma.attendance.findMany({
                where: {
                    OR: [
                        { roll_no: result.roll_no },
                        { inst_id: result.inst_id },
                    ]
                },
                select: {
                    date: true
                }, orderBy: {
                    //sorting....................................
                    date: 'desc'
                },
                skip: 0,
                take: 1,
            });

            //pagination
            const page = 1;
            const pageSize = 2;

            const startIndex = (page - 1) * pageSize;
            const endIndex = page * pageSize;

            const allDates = attendanceRecords.flatMap(record => record.date);

            // Slice the array to get the dates for the current page
            const paginatedDates = allDates.slice(startIndex, endIndex);

            res.status(200).json({page: page,pageSize: pageSize,totalRecords: allDates.length,
                totalPages: Math.ceil(allDates.length / pageSize),
                Attended_Dates: paginatedDates
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = new Attendance();