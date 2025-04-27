import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import API from '../api';

export default function UserForm() {
  const [user, setUser] = useState({ username: '', passwordHash: '', fullName: '', email: '', role: 'student' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      API.get(`/users/${id}`)
        .then(res => setUser(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      API.put(`/users/${id}`, user)
        .then(() => navigate('/'))
        .catch(err => console.error(err));
    } else {
      API.post('/users', user)
        .then(() => navigate('/'))
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        {id ? 'Cập nhật' : 'Thêm'} Người dùng
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Tên đăng nhập"
          name="username"
          value={user.username}
          onChange={handleChange}
          fullWidth
          required
        />
        {!id && (
          <TextField
            label="Mật khẩu"
            name="passwordHash"
            type="password"
            value={user.passwordHash}
            onChange={handleChange}
            fullWidth
            required
          />
        )}
        <TextField
          label="Họ tên"
          name="fullName"
          value={user.fullName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Vai trò</InputLabel>
          <Select
            name="role"
            value={user.role}
            onChange={handleChange}
            label="Vai trò"
          >
            <MenuItem value="student">Sinh viên</MenuItem>
            <MenuItem value="lecturer">Giảng viên</MenuItem>
            <MenuItem value="admin">Quản trị viên</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {id ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </form>
    </div>
  );
}
