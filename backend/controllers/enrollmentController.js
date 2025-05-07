const enrollmentService = require('../services/enrollmentService');

const registerClass = async (req, res, next) => {
    try {
        const { student_id, class_id } = req.body;
        const enrollment = await enrollmentService.registerClass(student_id, class_id);
        res.status(201).json(enrollment);
    } catch (error) {
        next(error);
    }
};

const getStudentEnrollments = async (req, res, next) => {
    try {
        const enrollments = await enrollmentService.getStudentEnrollments(req.params.studentId);
        res.json(enrollments);
    } catch (error) {
        next(error);
    }
};

const cancelEnrollment = async (req, res, next) => {
    try {
        await enrollmentService.cancelEnrollment(req.params.studentId, req.params.classId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerClass,
    getStudentEnrollments,
    cancelEnrollment
};