const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, authorize(['admin']), scheduleController.createSchedule);
router.get('/class/:classId', authenticate, scheduleController.getClassSchedules);
router.put('/:id', authenticate, authorize(['admin']), scheduleController.updateSchedule);
router.delete('/:id', authenticate, authorize(['admin']), scheduleController.deleteSchedule);

module.exports = router;