const curriculumService = require('../services/curriculumService');

const createCurriculum = async (req, res, next) => {
    try {
        const { program_name, description, academic_year } = req.body;
        const curriculum = await curriculumService.createCurriculum({ program_name, description, academic_year });
        res.status(201).json(curriculum);
    } catch (error) {
        next(error);
    }
};

const getAllCurriculums = async (req, res, next) => {
    try {
        const curriculums = await curriculumService.getAllCurriculums();
        res.json(curriculums);
    } catch (error) {
        next(error);
    }
};

const getCurriculumById = async (req, res, next) => {
    try {
        const curriculum = await curriculumService.getCurriculumById(req.params.id);
        res.json(curriculum);
    } catch (error) {
        next(error);
    }
};

const updateCurriculum = async (req, res, next) => {
    try {
        const curriculum = await curriculumService.updateCurriculum(req.params.id, req.body);
        res.json(curriculum);
    } catch (error) {
        next(error);
    }
};

const deleteCurriculum = async (req, res, next) => {
    try {
        await curriculumService.deleteCurriculum(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCurriculum,
    getAllCurriculums,
    getCurriculumById,
    updateCurriculum,
    deleteCurriculum
};