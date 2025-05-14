const pool = require('../config/db');

const createCourse = async ({ course_id, course_code, course_name, credits, is_mandatory, course_type, curriculum_id }) => {
    // Validate inputs
    if (!course_id || course_id <= 0) {
        throw new Error('Valid course ID is required');
    }
    if (!course_code || course_code.length > 10) {
        throw new Error('Course code is required and must be at most 10 characters');
    }
    if (!course_name) {
        throw new Error('Course name is required');
    }
    if (!credits || credits <= 0) {
        throw new Error('Valid credits are required');
    }
    if (is_mandatory === undefined) {
        throw new Error('Mandatory status is required');
    }
    if (!['theory', 'practice', 'project'].includes(course_type)) {
        throw new Error('Invalid course type');
    }
    // Validate curriculum_id exists
    const curriculumCheck = await pool.query('SELECT 1 FROM ChuongTrinhDaoTao WHERE curriculum_id = $1', [curriculum_id]);
    if (curriculumCheck.rows.length === 0) {
        throw new Error('Curriculum not found');
    }
    // Check course_id and course_code uniqueness
    const idCheck = await pool.query('SELECT 1 FROM MonHoc WHERE course_id = $1', [course_id]);
    if (idCheck.rows.length > 0) {
        throw new Error('Course ID already exists');
    }
    try {
        const result = await pool.query(
            'INSERT INTO MonHoc (course_id, course_code, course_name, credits, is_mandatory, course_type, curriculum_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [course_id, course_code, course_name, credits, is_mandatory, course_type, curriculum_id]
        );
        return result.rows[0];
    } catch (err) {
        if (err.message.includes('unique constraint')) {
            throw new Error('Course code already exists');
        }
        throw err;
    }
};

const getAllCourses = async () => {
    const result = await pool.query('SELECT * FROM MonHoc');
    return result.rows;
};

const updateCourse = async (id, { course_code, course_name, credits, is_mandatory, course_type, curriculum_id }) => {
    // Validate inputs
    if (!course_code || course_code.length > 10) {
        throw new Error('Course code is required and must be at most 10 characters');
    }
    if (!course_name) {
        throw new Error('Course name is required');
    }
    if (!credits || credits <= 0) {
        throw new Error('Valid credits are required');
    }
    if (is_mandatory === undefined) {
        throw new Error('Mandatory status is required');
    }
    if (!['theory', 'practice', 'project'].includes(course_type)) {
        throw new Error('Invalid course type');
    }
    // Validate curriculum_id exists
    const curriculumCheck = await pool.query('SELECT 1 FROM ChuongTrinhDaoTao WHERE curriculum_id = $1', [curriculum_id]);
    if (curriculumCheck.rows.length === 0) {
        throw new Error('Curriculum not found');
    }
    try {
        const result = await pool.query(
            'UPDATE MonHoc SET course_code = $1, course_name = $2, credits = $3, is_mandatory = $4, course_type = $5, curriculum_id = $6 WHERE course_id = $7 RETURNING *',
            [course_code, course_name, credits, is_mandatory, course_type, curriculum_id, id]
        );
        if (result.rows.length === 0) {
            throw new Error('Course not found');
        }
        return result.rows[0];
    } catch (err) {
        if (err.message.includes('unique constraint')) {
            throw new Error('Course code already exists');
        }
        throw err;
    }
};

const deleteCourse = async (id) => {
    const result = await pool.query('DELETE FROM MonHoc WHERE course_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
        throw new Error('Course not found');
    }
    return result.rows[0];
};

const getNextCourseId = async () => {
    const result = await pool.query('SELECT COALESCE(MAX(course_id), 0) + 1 AS next_id FROM MonHoc');
    return result.rows[0].next_id;
};

module.exports = {
    createCourse,
    getAllCourses,
    updateCourse,
    deleteCourse,
    getNextCourseId
};