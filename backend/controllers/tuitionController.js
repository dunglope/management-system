const tuitionService = require('../services/tuitionService');

const createTuition = async (req, res, next) => {
    try {
        const { student_id, semester, academic_year, total_credits, tuition_fee } = req.body;
        const tuition = await tuitionService.createTuition({ student_id, semester, academic_year, total_credits, tuition_fee });
        res.status(201).json(tuition);
    } catch (error) {
        next(error);
    }
};

const getStudentTuition = async (req, res, next) => {
    try {
        const tuition = await tuitionService.getStudentTuition(req.params.studentId);
        res.json(tuition);
    } catch (error) {
        next(error);
    }
};

const updateTuitionPayment = async (req, res, next) => {
    try {
        const tuition = await tuitionService.updateTuitionPayment(
            req.params.studentId,
            req.params.semester,
            req.params.academicYear
        );
        res.json(tuition);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTuition,
    getStudentTuition,
    updateTuitionPayment
};