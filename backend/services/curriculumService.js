const pool = require('../config/db');

const createCurriculum = async ({ program_name, description, academic_year }) => {
       // Get the next curriculum_id
       const maxIdResult = await pool.query('SELECT COALESCE(MAX(curriculum_id), 0) + 1 AS next_id FROM ChuongTrinhDaoTao');
       const curriculum_id = maxIdResult.rows[0].next_id;

       const result = await pool.query(
           'INSERT INTO ChuongTrinhDaoTao (curriculum_id, program_name, description, academic_year) VALUES ($1, $2, $3, $4) RETURNING *',
           [curriculum_id, program_name, description, academic_year]
       );
       return result.rows[0];
   };

const getAllCurriculums = async () => {
       const result = await pool.query('SELECT * FROM ChuongTrinhDaoTao');
       return result.rows;
   };

const getCurriculumById = async (id) => {
    const query = 'SELECT * FROM chuongtrinhdaotao WHERE curriculum_id = $1';
    const result = await pool.query(query, [id]);
    if (!result.rows[0]) throw new Error('Curriculum not found');
    return result.rows[0];
};

const updateCurriculum = async (id, { program_name, description, academic_year }) => {
    const result = await pool.query(
        'UPDATE ChuongTrinhDaoTao SET program_name = $1, description = $2, academic_year = $3 WHERE curriculum_id = $4 RETURNING *',
        [program_name, description, academic_year, id]
    );
    if (result.rows.length === 0) {
        throw new Error('Curriculum not found');
    }
    return result.rows[0];
};

const deleteCurriculum = async (id) => {
    const result = await pool.query('DELETE FROM ChuongTrinhDaoTao WHERE curriculum_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
        throw new Error('Curriculum not found');
    }
    return result.rows[0];
};

module.exports = {
    createCurriculum,
    getAllCurriculums,
    getCurriculumById,
    updateCurriculum,
    deleteCurriculum
};