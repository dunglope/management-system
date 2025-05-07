const gradeService = require('../services/gradeService');

const submitGrade = async (req, res, next) => {
    try {
        const { student_id, class_id, grade } = req.body;
        const gradeData = await gradeService.submitGrade(student_id, class_id, grade);
        res.status(201).json(gradeData);
    } catch (error) {
        next(error);
    }
};

const getStudentGrades = async (req, res, next) => {
    try {
        const grades = await gradeService.getStudentGrades(req.params.studentId);
        res.json(grades);
    } catch (error) {
        next(error);
    }
};

const requestGradeReview = async (req, res, next) => {
    try {
        const { student_id, class_id, reason } = req.body;
        const review = await gradeService.requestGradeReview(student_id, class_id, reason);
        res.status(201).json(review);
    } catch (error) {
        next(error);
    }
};

const updateGradeReview = async (req, res, next) => {
    try {
        const { status, result } = req.body;
        const review = await gradeService.updateGradeReview(req.params.reviewId, status, result);
        res.json(review);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    submitGrade,
    getStudentGrades,
    requestGradeReview,
    updateGradeReview
};