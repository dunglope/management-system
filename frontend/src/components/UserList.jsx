import { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    API.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDeleteClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDeleteClose = () => {
    setOpen(false);
  };

  const deleteUser = () => {
    API.delete(`/users/${selectedUser.user_id}`)
      .then(() => {
        setUsers(users.filter(u => u.user_id !== selectedUser.user_id));
        setOpen(false);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Danh sách Người dùng
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/add" sx={{ marginBottom: 2 }}>
        Thêm người dùng
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên đăng nhập</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.user_id}>
                <TableCell>{u.user_id}</TableCell>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.full_name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteClickOpen(u)}
                  >
                    Xóa
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={`/edit/${u.user_id}`}
                    sx={{ marginLeft: 1 }}
                  >
                    Sửa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={open}
        onClose={handleDeleteClose}
      >
        <DialogTitle>Xóa người dùng</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa người dùng {selectedUser?.username} không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Hủy
          </Button>
          <Button onClick={deleteUser} color="secondary">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
