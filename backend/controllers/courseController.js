const courseService = require('../services/courseService');

const createCourse = async (req, res) => {
    try {
        const course = await courseService.createCourse(req.body);
        res.status(201).json(course);
    } catch (err) {
        if (err.message === 'Curriculum not found' || 
            err.message.includes('already exists') || 
            err.message.includes('required') || 
            err.message.includes('Invalid course type')) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateCourse = async (req, res) => {
    try {
        const course = await courseService.updateCourse(req.params.id, req.body);
        res.json(course);
    } catch (err) {
        if (err.message === 'Course not found') {
            res.status(404).json({ message: err.message });
        } else if (err.message === 'Curriculum not found' || 
                   err.message.includes('already exists') || 
                   err.message.includes('required') || 
                   err.message.includes('Invalid course type')) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
};

const deleteCourse = async (req, res) => {
    try {
        await courseService.deleteCourse(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(err.message === 'Course not found' ? 404 : 500).json({ message: err.message });
    }
};

const getNextCourseId = async (req, res) => {
    try {
        const nextId = await courseService.getNextCourseId();
        res.json({ nextId });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    getNextCourseId
};