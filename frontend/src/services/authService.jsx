const API_URL = 'http://localhost:3000/api/auth'; // Địa chỉ API của backend

// Đăng nhập
const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    
    if (response.ok) {
      // Lưu thông tin token và role vào localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role); // Lưu role người dùng
      return data.user; // Trả về thông tin người dùng
    } else {
      throw new Error(data.message || 'Đăng nhập thất bại');
    }
  } catch (error) {
    throw new Error(error.message || 'Có lỗi xảy ra khi đăng nhập');
  }
};

// Đăng xuất
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
};

// Kiểm tra xem người dùng có đăng nhập hay không
const isLoggedIn = () => {
  return !!localStorage.getItem('token'); // Kiểm tra nếu có token trong localStorage
};

// Lấy thông tin người dùng đã đăng nhập
const getUser = () => {
  const userRole = localStorage.getItem('userRole');
  return userRole ? userRole : null;
};

// Lấy token
const getToken = () => {
  return localStorage.getItem('token');
};

export default {
  login,
  logout,
  isLoggedIn,
  getUser,
  getToken,
};