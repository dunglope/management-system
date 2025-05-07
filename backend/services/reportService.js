const pool = require('../config/db');

const getStudentProgress = async (student_id) => {
    const query = `
        SELECT mh.course_name, d.grade, lhp.semester, lhp.academic_year
        FROM Diem d
        JOIN LopHocPhan lhp ON d.class_id = lhp.class_id
        JOIN MonHoc mh ON lhp.course_id = mh.course_id
        WHERE d.student_id = $1
        ORDER BY lhp.academic_year, lhp.semester
    `;
    const result = await pool.query(query, [student_id]);
    return result.rows;
};

const getClassPerformance = async (class_id) => {
    const query = `
        SELECT sv.student_id, nd.full_name, d.grade
        FROM Diem d
        JOIN SinhVien sv ON d.student_id = sv.student_id
        JOIN NguoiDung nd ON sv.user_id = nd.user_id
        WHERE d.class_id = $1
    `;
    const result = await pool.query(query, [class_id]);
    return result.rows;
};

const getTuitionStatus = async (semester, academic_year) => {
    const query = `
        SELECT sv.student_id, nd.full_name, hp.tuition_fee, hp.is_paid
        FROM HocPhi hp
        JOIN SinhVien sv ON hp.student_id = sv.student_id
        JOIN NguoiDung nd ON sv.user_id = nd.user_id
        WHERE hp.semester = $1 AND hp.academic_year = $2
    `;
    const result = await pool.query(query, [semester, academic_year]);
    return result.rows;
};

module.exports = {
    getStudentProgress,
    getClassPerformance,
    getTuitionStatus
};