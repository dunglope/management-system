const express = require('express');
const router = express.Router();
const tuitionController = require('../controllers/tuitionController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize(['admin']), tuitionController.createTuition);
router.get('/student/:studentId', authenticate, tuitionController.getStudentTuition);
router.put('/pay/:studentId/:semester/:academicYear', authenticate, authorize(['admin']), tuitionController.updateTuitionPayment);

module.exports = router;