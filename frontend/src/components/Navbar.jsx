import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Trường Đai học Brainrot
        </Typography>
        <Button color="inherit" component={Link} to="/home">Trang chủ</Button>
        <Button color="inherit" component={Link} to="/login">Đăng nhập</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;