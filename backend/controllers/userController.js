const authService = require('../services/authService');
const userModel = require('../models/userModel');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { token, user } = await authService.login(username, password);
        res.json({ token, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lấy danh sách người dùng
const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

// Lấy thông tin người dùng theo ID
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

// Tạo mới người dùng
const createUser = async (req, res) => {
  const { username, password_hash, full_name, email, role } = req.body;
  try {
    const newUser = await userModel.createUser(username, password_hash, full_name, email, role);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi tạo người dùng' });
  }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, email, role } = req.body;
  try {
    const updatedUser = await userModel.updateUser(id, full_name, email, role);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi cập nhật người dùng' });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userModel.deleteUser(id);
    res.status(200).json(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi khi xóa người dùng' });
  }
};


module.exports = {
  login,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};