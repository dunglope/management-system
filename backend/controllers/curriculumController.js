const curriculumService = require('../services/curriculumService');

const createCurriculum = async (req, res) => {
    try {
        const curriculum = await curriculumService.createCurriculum(req.body);
        res.status(201).json(curriculum);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllCurriculums = async (req, res) => {
    try {
        const curriculums = await curriculumService.getAllCurriculums();
        res.json(curriculums);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateCurriculum = async (req, res) => {
    try {
        const curriculum = await curriculumService.updateCurriculum(req.params.id, req.body);
        res.json(curriculum);
    } catch (err) {
        res.status(err.message === 'Curriculum not found' ? 404 : 500).json({ message: err.message });
    }
};

const deleteCurriculum = async (req, res) => {
    try {
        await curriculumService.deleteCurriculum(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(err.message === 'Curriculum not found' ? 404 : 500).json({ message: err.message });
    }
};

module.exports = {
    createCurriculum,
    getAllCurriculums,
    updateCurriculum,
    deleteCurriculum
};