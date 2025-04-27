const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Middleware xác thực token JWT
const authenticateToken = (req, res, next) => {
  // Lấy token từ header Authorization
  const token = req.header('Authorization')?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc không có quyền truy cập.' });
  }

  // Xác thực token
  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token hết hạn hoặc không hợp lệ.' });
    }
    req.user = user; // Lưu thông tin user vào request object
    next();
  });
};

// Middleware kiểm tra quyền quản trị viên
const checkAdminRole = (req, res, next) => {
  // Kiểm tra xem người dùng có phải là admin hay không
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Bạn không có quyền truy cập trang quản trị.' });
  }
  next(); // Nếu là admin, cho phép tiếp tục
};

module.exports = { authenticateToken, checkAdminRole };