const pool = require('../config/db');

const submitGrade = async (student_id, class_id, grade) => {
    const query = `
        INSERT INTO Diem (student_id, class_id, grade, is_reviewed)
        VALUES ($1, $2, $3, FALSE)
        ON CONFLICT (student_id, class_id)
        DO UPDATE SET grade = $3
        RETURNING *;
    `;
    const result = await pool.query(query, [student_id, class_id, grade]);
    return result.rows[0];
};

const getStudentGrades = async (student_id) => {
    const query = `
        SELECT d.*, mh.course_name, lhp.semester, lhp.academic_year
        FROM Diem d
        JOIN LopHocPhan lhp ON d.class_id = lhp.class_id
        JOIN MonHoc mh ON lhp.course_id = mh.course_id
        WHERE d.student_id = $1
    `;
    const result = await pool.query(query, [student_id]);
    return result.rows;
};

const requestGradeReview = async (student_id, class_id, reason) => {
    const query = `
        INSERT INTO PhucKhao (review_id, student_id, class_id, reason, request_date, status)
        VALUES (DEFAULT, $1, $2, $3, CURRENT_DATE, 'pending')
        RETURNING *;
    `;
    const result = await pool.query(query, [student_id, class_id, reason]);
    return result.rows[0];
};

const updateGradeReview = async (review_id, status, result) => {
    const query = `
        UPDATE PhucKhao
        SET status = $1, result = $2
        WHERE review_id = $3
        RETURNING *;
    `;
    const res = await pool.query(query, [status, result, review_id]);
    if (!res.rows[0]) throw new Error('Review not found');
    return res.rows[0];
};

module.exports = {
    submitGrade,
    getStudentGrades,
    requestGradeReview,
    updateGradeReview
};