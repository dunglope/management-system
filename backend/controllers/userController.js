const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
      const { username, password, full_name, email, role } = req.body;
      if (!username || !password || !full_name || !email || !role) {
          return res.status(400).json({ error: 'All fields are required' });
      }
      if (password.length < 6) {
          return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
          return res.status(400).json({ error: 'Invalid email format' });
      }
      if (!['student', 'lecturer', 'admin'].includes(role)) {
          return res.status(400).json({ error: 'Invalid role' });
      }
      await userService.createUser({ username, password, full_name, email, role });
      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      if (error.message === 'Username already exists' || error.message === 'Email already exists') {
          return res.status(400).json({ error: error.message });
      }
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
      const { username, password } = req.body;
      if (!username || !password) {
          return res.status(400).json({ error: 'Username and password are required' });
      }

      const user = await userService.findUserByUsername(username);
      if (!user) {
          return res.status(401).json({ error: 'Invalid username or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ error: 'Invalid username or password' });
      }

      const token = jwt.sign(
          { id: user.user_id, username: user.username, role: user.role },
          process.env.JWT_SECRET || 'your_jwt_secret',
          { expiresIn: '1h' }
      );

      res.status(200).json({ token });
  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};