const pool = require('../config/db');

const createTuition = async ({ student_id, semester, academic_year, total_credits, tuition_fee }) => {
    const query = `
        INSERT INTO HocPhi (student_id, semester, academic_year, total_credits, tuition_fee, is_paid)
        VALUES ($1, $2, $3, $4, $5, FALSE)
        RETURNING *;
    `;
    const result = await pool.query(query, [student_id, semester, academic_year, total_credits, tuition_fee]);
    return result.rows[0];
};

const getStudentTuition = async (student_id) => {
    const query = 'SELECT * FROM HocPhi WHERE student_id = $1';
    const result = await pool.query(query, [student_id]);
    return result.rows;
};

const updateTuitionPayment = async (student_id, semester, academic_year) => {
    const query = `
        UPDATE HocPhi
        SET is_paid = TRUE
        WHERE student_id = $1 AND semester = $2 AND academic_year = $3
        RETURNING *;
    `;
    const result = await pool.query(query, [student_id, semester, academic_year]);
    if (!result.rows[0]) throw new Error('Tuition record not found');
    return result.rows[0];
};

module.exports = {
    createTuition,
    getStudentTuition,
    updateTuitionPayment
};