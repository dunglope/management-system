import React, { useState } from 'react';
import { Button, TextField, Grid, Box, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        username,
        password,
      });

      if (response.data.success) {
        // Lưu token vào localStorage (hoặc sessionStorage) để sử dụng sau này
        localStorage.setItem('token', response.data.user.token);

        // Dựa vào redirect trả về, chuyển hướng người dùng
        navigate(response.data.redirect);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message || 'Lỗi đăng nhập!');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Tên đăng nhập:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default LoginPage;
