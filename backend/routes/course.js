const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize(['admin']), courseController.createCourse);
router.get('/', authenticate, courseController.getAllCourses);
router.get('/:id', authenticate, courseController.getCourseById);
router.put('/:id', authenticate, authorize(['admin']), courseController.updateCourse);
router.delete('/:id', authenticate, authorize(['admin']), courseController.deleteCourse);
router.post('/:id/prerequisites', authenticate, authorize(['admin']), courseController.addPrerequisite);
router.post('/classes', authenticate, authorize(['admin']), courseController.createClass);

module.exports = router;