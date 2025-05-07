const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize(['lecturer']), gradeController.submitGrade);
router.get('/student/:studentId', authenticate, gradeController.getStudentGrades);
router.post('/review', authenticate, authorize(['student']), gradeController.requestGradeReview);
router.put('/review/:reviewId', authenticate, authorize(['lecturer', 'admin']), gradeController.updateGradeReview);

module.exports = router;