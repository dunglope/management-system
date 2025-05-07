const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize(['student']), enrollmentController.registerClass);
router.get('/student/:studentId', authenticate, enrollmentController.getStudentEnrollments);
router.delete('/:studentId/:classId', authenticate, authorize(['student', 'admin']), enrollmentController.cancelEnrollment);

module.exports = router;