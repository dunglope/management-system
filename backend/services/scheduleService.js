const pool = require('../config/db');

const createSchedule = async ({ class_id, type, date, start_time, end_time, location }) => {
    const query = `
        INSERT INTO ThoiKhoaBieu (schedule_id, class_id, type, date, start_time, end_time, location)
        VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const result = await pool.query(query, [class_id, type, date, start_time, end_time, location]);
    return result.rows[0];
};

const getClassSchedules = async (class_id) => {
    const query = 'SELECT * FROM ThoiKhoaBieu WHERE class_id = $1';
    const result = await pool.query(query, [class_id]);
    return result.rows;
};

const updateSchedule = async (id, { class_id, type, date, start_time, end_time, location }) => {
    const query = `
        UPDATE ThoiKhoaBieu
        SET class_id = $1, type = $2, date = $3, start_time = $4, end_time = $5, location = $6
        WHERE schedule_id = $7
        RETURNING *;
    `;
    const result = await pool.query(query, [class_id, type, date, start_time, end_time, location, id]);
    if (!result.rows[0]) throw new Error('Schedule not found');
    return result.rows[0];
};

const deleteSchedule = async (id) => {
    const query = 'DELETE FROM ThoiKhoaBieu WHERE schedule_id = $1';
    await pool.query(query, [id]);
};

module.exports = {
    createSchedule,
    getClassSchedules,
    updateSchedule,
    deleteSchedule
};