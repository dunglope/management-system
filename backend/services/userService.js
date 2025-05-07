const pool = require('../config/db');
const bcrypt = require('bcrypt');

const createUser = async ({ username, password, full_name, email, role }) => {
  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `
          INSERT INTO nguoidung (username, password, full_name, email, role)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING user_id
      `;
      const values = [username, hashedPassword, full_name, email, role];
      const result = await pool.query(query, values);
      return result.rows[0].user_id;
  } catch (error) {
      if (error.code === '23505') {
          if (error.constraint === 'nguoidung_username_key') {
              throw new Error('Username already exists');
          }
          if (error.constraint === 'nguoidung_email_key') {
              throw new Error('Email already exists');
          }
      }
      throw error;
  }
};

const findUserByUsername = async (username) => {
  try {
      const query = `
          SELECT user_id, username, password, role
          FROM nguoidung
          WHERE username = $1
      `;
      const result = await pool.query(query, [username]);
      return result.rows[0] || null;
  } catch (error) {
      throw error;
  }
};


const getUserByUsername = async (username) => {
    const query = 'SELECT * FROM NguoiDung WHERE username = $1';
    const result = await pool.query(query, [username]);
    return result.rows[0];
};

const getAllUsers = async () => {
    const query = 'SELECT * FROM NguoiDung';
    const result = await pool.query(query);
    return result.rows;
};

const getUserById = async (id) => {
    const query = 'SELECT * FROM NguoiDung WHERE user_id = $1';
    const result = await pool.query(query, [id]);
    if (!result.rows[0]) throw new Error('User not found');
    return result.rows[0];
};

const updateUser = async (id, { username, full_name, email }) => {
    const query = `
        UPDATE NguoiDung
        SET username = $1, full_name = $2, email = $3
        WHERE user_id = $4
        RETURNING *;
    `;
    const result = await pool.query(query, [username, full_name, email, id]);
    if (!result.rows[0]) throw new Error('User not found');
    return result.rows[0];
};

const deleteUser = async (id) => {
    const query = 'DELETE FROM NguoiDung WHERE user_id = $1';
    await pool.query(query, [id]);
};

module.exports = {
    createUser,
    getUserByUsername,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    findUserByUsername
};