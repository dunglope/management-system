const pool = require('../config/db');

// Lấy danh sách người dùng
async function getAllUsers() {
  const { rows } = await pool.query('SELECT * FROM "NguoiDung" ORDER BY user_id ASC');
  return rows;
}

// Thêm người dùng mới
async function createUser(user) {
    const { username, password_hash, full_name, email, role } = user;
    const { rows } = await pool.query(
      'INSERT INTO "NguoiDung" (username, password_hash, full_name, email, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, password_hash, full_name, email, role]
    );
    return rows[0];
  }

// Cập nhật người dùng
async function updateUser(user_id, user) {
  const { full_name, email, role, is_active } = user;
  const { rows } = await pool.query(
    'UPDATE "NguoiDung" SET full_name=$1, email=$2, role=$3, is_active=$4 WHERE user_id=$5 RETURNING *',
    [full_name, email, role, is_active, user_id]
  );
  return rows[0];
}

// Xóa người dùng
async function deleteUser(user_id) {
  await pool.query('DELETE FROM "NguoiDung" WHERE user_id=$1', [user_id]);
  return { message: "User deleted successfully" };
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
};