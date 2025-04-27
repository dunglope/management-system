import { Container, Typography, Box, Paper } from '@mui/material';

export default function LecturerPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Giảng viên - Dashboard
      </Typography>

      <Box display="flex" justifyContent="center" mt={4}>
        <Paper elevation={3} sx={{ p: 4, width: 400 }}>
          <Typography variant="h6" gutterBottom>
            Chức năng giảng viên
          </Typography>
          <Typography variant="body1">
            • Quản lý lớp học phần phụ trách<br />
            • Nhập điểm cho sinh viên<br />
            • Xem lịch thi, lịch giảng dạy<br />
            • Duyệt phúc khảo điểm
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
