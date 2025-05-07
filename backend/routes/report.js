const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/student-progress/:studentId', authenticate, authorize(['admin', 'student']), reportController.getStudentProgress);
router.get('/class-performance/:classId', authenticate, authorize(['admin', 'lecturer']), reportController.getClassPerformance);
router.get('/tuition-status/:semester/:academicYear', authenticate, authorize(['admin']), reportController.getTuitionStatus);

module.exports = router;