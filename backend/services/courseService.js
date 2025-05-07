const pool = require('../config/db');

const createCourse = async ({ course_code, course_name, credits, is_mandatory, course_type, curriculum_id }) => {
    const query = `
        INSERT INTO MonHoc (course_id, course_code, course_name, credits, is_mandatory, course_type, curriculum_id)
        VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const result = await pool.query(query, [course_code, course_name, credits, is_mandatory, course_type, curriculum_id]);
    return result.rows[0];
};

const getAllCourses = async () => {
    const query = 'SELECT * FROM MonHoc';
    const result = await pool.query(query);
    return result.rows;
};

const getCourseById = async (id) => {
    const query = 'SELECT * FROM MonHoc WHERE course_id = $1';
    const result = await pool.query(query, [id]);
    if (!result.rows[0]) throw new Error('Course not found');
    return result.rows[0];
};

const updateCourse = async (id, { course_code, course_name, credits, is_mandatory, course_type, curriculum_id }) => {
    const query = `
        UPDATE MonHoc
        SET course_code = $1, course_name = $2, credits = $3, is_mandatory = $4, course_type = $5, curriculum_id = $6
        WHERE course_id = $7
        RETURNING *;
    `;
    const result = await pool.query(query, [course_code, course_name, credits, is_mandatory, course_type, curriculum_id, id]);
    if (!result.rows[0]) throw new Error('Course not found');
    return result.rows[0];
};

const deleteCourse = async (id) => {
    const query = 'DELETE FROM MonHoc WHERE course_id = $1';
    await pool.query(query, [id]);
};

const addPrerequisite = async (course_id, prerequisite_id) => {
    const query = `
        INSERT INTO MonHocTienQuyet (course_id, prerequisite_id)
        VALUES ($1, $2)
    `;
    await pool.query(query, [course_id, prerequisite_id]);
};

const createClass = async ({ course_id, semester, academic_year, lecturer_id, max_SinhVien }) => {
    const query = `
        INSERT INTO LopHocPhan (class_id, course_id, semester, academic_year, lecturer_id, max_SinhVien)
        VALUES (DEFAULT, $1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const result = await pool.query(query, [course_id, semester, academic_year, lecturer_id, max_SinhVien]);
    return result.rows[0];
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