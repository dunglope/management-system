const pool = require('../config/db');

const registerClass = async (student_id, class_id) => {
    const checkQuery = `
        SELECT COUNT(*) as count 
        FROM DangKyHocPhan 
        WHERE class_id = $1 
        AND status = 'active'
    `;
    const maxQuery = 'SELECT max_SinhVien FROM LopHocPhan WHERE class_id = $1';
    
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        const { rows: [countRow] } = await client.query(checkQuery, [class_id]);
        const { rows: [maxRow] } = await client.query(maxQuery, [class_id]);
        
        if (parseInt(countRow.count) >= maxRow.max_SinhVien) {
            throw new Error('Class is full');
        }

        const query = `
            INSERT INTO DangKyHocPhan (student_id, class_id, registration_date, status)
            VALUES ($1, $2, CURRENT_DATE, 'active')
            RETURNING *;
        `;
        const result = await client.query(query, [student_id, class_id]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const getStudentEnrollments = async (student_id) => {
    const query = `
        SELECT dk.*, lhp.semester, lhp.academic_year, mh.course_name
        FROM DangKyHocPhan dk
        JOIN LopHocPhan lhp ON dk.class_id = lhp.class_id
        JOIN MonHoc mh ON lhp.course_id = mh.course_id
        WHERE dk.student_id = $1
    `;
    const result = await pool.query(query, [student_id]);
    return result.rows;
};

const cancelEnrollment = async (student_id, class_id) => {
    const query = `
        UPDATE DangKyHocPhan
        SET status = 'withdrawn'
        WHERE student_id = $1 AND class_id = $2
    `;
    await pool.query(query, [student_id, class_id]);
};

module.exports = {
    registerClass,
    getStudentEnrollments,
    cancelEnrollment
};