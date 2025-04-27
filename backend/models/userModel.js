const pool = require('../config/db');

// Lấy danh sách tất cả người dùng
const getAllUsers = async () => {
  const query = 'SELECT * FROM NguoiDung WHERE is_active = true';
  const result = await pool.query(query);
  return result.rows;
};

// Lấy thông tin người dùng theo ID
const getUserById = async (userId) => {
  const query = 'SELECT * FROM NguoiDung WHERE user_id = $1';
  const result = await pool.query(query, [userId]);
  return result.rows[0];
};

// Thêm người dùng mới
const createUser = async (username, password_hash, full_name, email, role) => {
  const query = `
    INSERT INTO NguoiDung (username, password_hash, full_name, email, role)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const result = await pool.query(query, [username, password_hash, full_name, email, role]);
  return result.rows[0];
};

// Cập nhật thông tin người dùng
const updateUser = async (userId, full_name, email, role) => {
  const query = `
    UPDATE NguoiDung SET full_name = $1, email = $2, role = $3 WHERE user_id = $4 RETURNING *`;
  const result = await pool.query(query, [full_name, email, role, userId]);
  return result.rows[0];
};

// Xóa người dùng
const deleteUser = async (userId) => {
  const query = 'UPDATE NguoiDung SET is_active = false WHERE user_id = $1 RETURNING *';
  const result = await pool.query(query, [userId]);
  return result.rows[0];
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById
};