const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize(['admin']), courseController.createCourse);
router.get('/', authenticate, authorize(['admin', 'lecturer', 'student']), courseController.getAllCourses);
router.put('/:id', authenticate, authorize(['admin']), courseController.updateCourse);
router.delete('/:id', authenticate, authorize(['admin']), courseController.deleteCourse);
router.get('/next-id', authenticate, authorize(['admin']), courseController.getNextCourseId);

module.exports = router;