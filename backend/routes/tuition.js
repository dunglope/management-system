const express = require('express');
const router = express.Router();
const tuitionController = require('../controllers/tuitionController');
const { authenticate, authorize } = require('../middleware/auth');
const pool = require('../config/db');

router.post('/', authenticate, authorize(['admin']), tuitionController.createTuition);
router.get('/student/:studentId', authenticate, tuitionController.getStudentTuition);
router.put('/pay/:studentId/:semester/:academicYear', authenticate, authorize(['admin']), tuitionController.updateTuitionPayment);

// Get unpaid tuition records (for admin)
router.get('/unpaid', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM HocPhi WHERE is_paid = FALSE');
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
});

module.exports = router;