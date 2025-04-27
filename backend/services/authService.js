const db = require('../config/db'); // Kết nối tới database (PostgreSQL)
const bcrypt = require('bcryptjs'); // Thư viện hash mật khẩu (không cần khi không mã hóa)
const jwt = require('jsonwebtoken'); // Thư viện tạo token JWT

// Kiểm tra người dùng đăng nhập
const login = async (username, password) => {
  try {
    // Lấy thông tin người dùng từ cơ sở dữ liệu
    const res = await db.query('SELECT * FROM "NguoiDung" WHERE username = $1', [username]);

    // Kiểm tra nếu không tìm thấy người dùng
    if (res.rows.length === 0) {
      throw new Error('Tài khoản không tồn tại');
    }

    // Lấy mật khẩu lưu trong cơ sở dữ liệu
    const user = res.rows[0];

    // So sánh mật khẩu người dùng nhập vào và mật khẩu trong cơ sở dữ liệu
    if (user.password_hash !== password) {
      throw new Error('Mật khẩu không chính xác');
    }

    // Tạo JWT token nếu đăng nhập thành công
    const token = jwt.sign({ user_id: user.user_id, role: user.role }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    // Trả về thông tin người dùng và token
    return {
      user_id: user.user_id,
      username: user.username,
      role: user.role,
      token,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { login };