const express = require('express');
const router = express.Router();
const curriculumController = require('../controllers/curriculumController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize(['admin']), curriculumController.createCurriculum);
router.get('/', authenticate, authorize(['admin', 'lecturer', 'student']), curriculumController.getAllCurriculums);
router.put('/:id', authenticate, authorize(['admin']), curriculumController.updateCurriculum);
router.delete('/:id', authenticate, authorize(['admin']), curriculumController.deleteCurriculum);

module.exports = router;