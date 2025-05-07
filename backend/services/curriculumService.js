const pool = require('../config/db');

const createCurriculum = async ({ program_name, description, academic_year }) => {
    const query = `
        INSERT INTO ChuongTrinhDaoTao (curriculum_id, program_name, description, academic_year)
        VALUES (DEFAULT, $1, $2, $3)
        RETURNING *;
    `;
    const result = await pool.query(query, [program_name, description, academic_year]);
    return result.rows[0];
};

const getAllCurriculums = async () => {
    const query = 'SELECT * FROM ChuongTrinhDaoTao';
    const result = await pool.query(query);
    return result.rows;
};

const getCurriculumById = async (id) => {
    const query = 'SELECT * FROM ChuongTrinhDaoTao WHERE curriculum_id = $1';
    const result = await pool.query(query, [id]);
    if (!result.rows[0]) throw new Error('Curriculum not found');
    return result.rows[0];
};

const updateCurriculum = async (id, { program_name, description, academic_year }) => {
    const query = `
        UPDATE ChuongTrinhDaoTao
        SET program_name = $1, description = $2, academic_year = $3
        WHERE curriculum_id = $4
        RETURNING *;
    `;
    const result = await pool.query(query, [program_name, description, academic_year, id]);
    if (!result.rows[0]) throw new Error('Curriculum not found');
    return result.rows[0];
};

const deleteCurriculum = async (id) => {
    const query = 'DELETE FROM ChuongTrinhDaoTao WHERE curriculum_id = $1';
    await pool.query(query, [id]);
};

module.exports = {
    createCurriculum,
    getAllCurriculums,
    getCurriculumById,
    updateCurriculum,
    deleteCurriculum
};