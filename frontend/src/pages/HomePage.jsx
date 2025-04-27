import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box sx={{ backgroundColor: '#f4f6f9', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ paddingTop: '2rem' }}>
        {/* Hero Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <Typography variant="h3" component="h1" align="center" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
            Chào mừng đến với Trường Đại học Brainrot
          </Typography>
          <Typography variant="h6" align="center" sx={{ marginTop: '1rem', color: '#6c757d' }}>
            Cung cấp các chương trình học chất lượng cao, môi trường học tập lý tưởng
          </Typography>
        </Box>

        {/* Thông báo */}
        <Box sx={{ marginBottom: '3rem' }}>
          <Typography variant="h4" align="center" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
            Thông báo mới nhất
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    Lịch học kỳ 2 năm 2025
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '1rem' }}>
                    Lịch học chính thức cho học kỳ 2 năm học 2025 đã được công bố. Hãy kiểm tra lịch học của bạn ngay!
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth component={Link} to="/schedule">
                    Xem chi tiết
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    Đăng ký học phần
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '1rem' }}>
                    Thời gian đăng ký học phần cho học kỳ tới đã mở. Đừng quên đăng ký sớm để tránh tình trạng đầy lớp.
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth component={Link} to="/register">
                    Đăng ký ngay
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    Lịch thi cuối kỳ
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '1rem' }}>
                    Các bạn sinh viên chú ý lịch thi cuối kỳ sẽ được công bố vào đầu tháng 6. Hãy chuẩn bị tốt cho kỳ thi!
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth component={Link} to="/exam-schedule">
                    Xem lịch thi
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Giới thiệu Trường */}
        <Box sx={{ marginBottom: '3rem' }}>
          <Typography variant="h4" align="center" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
            Giới thiệu Trường Đại học Brainrot
          </Typography>
          <Typography variant="body1" align="center" sx={{ marginBottom: '1rem', color: '#6c757d' }}>
            Trường Đại học Brainrot được thành lập từ năm 2077, với mục tiêu trở thành một cơ sở giáo dục hàng đầu trong lĩnh vực đào tạo và nghiên cứu. Chúng tôi cung cấp các chương trình đào tạo đa dạng, đáp ứng nhu cầu học tập của sinh viên trong và ngoài nước.
          </Typography>
          <Typography variant="body1" align="center" sx={{ color: '#6c757d' }}>
            Với đội ngũ giảng viên xuất sắc, cơ sở vật chất hiện đại và môi trường học tập thân thiện, chúng tôi cam kết cung cấp cho sinh viên những kiến thức và kỹ năng tốt nhất để phát triển nghề nghiệp.
          </Typography>
        </Box>

        {/* Call to Action */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <Button variant="contained" color="primary" sx={{ padding: '1rem 2rem' }} component={Link} to="/programs">
            Khám phá các chương trình học
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;