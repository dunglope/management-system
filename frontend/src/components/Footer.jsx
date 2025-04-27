import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ p: 2, bgcolor: 'primary.main', marginTop: 'auto' }}>
      <Typography variant="body1" align="center" color="white">
        © 2025 Hệ thống Quản lý đào tạo - Đại học Brainrot
      </Typography>
    </Box>
  );
}

export default Footer;
