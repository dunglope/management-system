const reportService = require('../services/reportService');

const getStudentProgress = async (req, res, next) => {
    try {
        const report = await reportService.getStudentProgress(req.params.studentId);
        res.json(report);
    } catch (error) {
        next(error);
    }
};

const getClassPerformance = async (req, res, next) => {
    try {
        const report = await reportService.getClassPerformance(req.params.classId);
        res.json(report);
    } catch (error) {
        next(error);
    }
};

const getTuitionStatus = async (req, res, next) => {
    try {
        const report = await reportService.getTuitionStatus(req.params.semester, req.params.academicYear);
        res.json(report);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStudentProgress,
    getClassPerformance,
    getTuitionStatus
};