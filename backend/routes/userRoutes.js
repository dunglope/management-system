const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

// Đăng nhập
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await authService.login(username, password);

    // Kiểm tra role và trả về thông tin người dùng
    if (user.role === 'admin') {
      // Nếu là admin, gửi thông tin để frontend chuyển hướng tới trang quản trị viên
      return res.status(200).json({ success: true, user, redirect: '/admin' });
    } else if (user.role === 'student') {
      // Nếu là sinh viên, gửi thông tin để frontend chuyển hướng tới trang chủ
      return res.status(200).json({ success: true, user, redirect: '/home' });
    } else if (user.role === 'lecturer') {
      // Nếu là giảng viên, gửi thông tin để frontend chuyển hướng tới trang giảng viên
      return res.status(200).json({ success: true, user, redirect: '/lecturer' });
    }

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;