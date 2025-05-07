const courseService = require('../services/courseService');
const pool = require('../config/db');

const createCourse = async (req, res, next) => {
    try {
        const { course_code, course_name, credits, is_mandatory, course_type, curriculum_id } = req.body;
        const course = await courseService.createCourse({ course_code, course_name, credits, is_mandatory, course_type, curriculum_id });
        res.status(201).json(course);
    } catch (error) {
        next(error);
    }
};

const getAllCourses = async (req, res, next) => {
    try {
        const query = 'SELECT course_code, course_name, credits, is_mandatory, course_type, curriculum_id FROM monhoc';
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getCourseById = async (req, res, next) => {
    try {
        const course = await courseService.getCourseById(req.params.id);
        res.json(course);
    } catch (error) {
        next(error);
    }
};

const updateCourse = async (req, res, next) => {
    try {
        const course = await courseService.updateCourse(req.params.id, req.body);
        res.json(course);
    } catch (error) {
        next(error);
    }
};

const deleteCourse = async (req, res, next) => {
    try {
        await courseService.deleteCourse(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const addPrerequisite = async (req, res, next) => {
    try {
        const { prerequisite_id } = req.body;
        await courseService.addPrerequisite(req.params.id, prerequisite_id);
        res.status(201).json({ message: 'Prerequisite added' });
    } catch (error) {
        next(error);
    }
};

const createClass = async (req, res, next) => {
    try {
        const { course_id, semester, academic_year, lecturer_id, max_SinhVien } = req.body;
        const classData = await courseService.createClass({ course_id, semester, academic_year, lecturer_id, max_SinhVien });
        res.status(201).json(classData);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    addPrerequisite,
    createClass
};