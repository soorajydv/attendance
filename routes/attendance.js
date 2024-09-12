const express = require('express')
const router = express.Router()
const attendanceController = require('../controllers/attendance')
const checkRole = require('../middlewares/roleCheck');
const authenticateToken = require('../middlewares/authenticate');

router.get('/getAttendanceList',authenticateToken,checkRole(['ADMIN','TEACHER']),attendanceController.getAttendanceList)

router.post('/student/:id',authenticateToken,checkRole(['TEACHER','ADMIN']),attendanceController.createStudentAttendance)
router.post('/teacher/:id',authenticateToken,checkRole(['ADMIN']),attendanceController.createTeacherAttendance)

router.patch('/student/:id',authenticateToken,checkRole(['ADMIN','TEACHER']),attendanceController.updateStudentAttendance)
router.patch('/teacher/:id',authenticateToken,checkRole(['ADMIN']),attendanceController.updateTeacherAttendance)

router.delete('/delete/:id',authenticateToken,checkRole(['ADMIN']),attendanceController.deleteAttendance)

module.exports = router

