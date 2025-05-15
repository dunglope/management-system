-- Mô hình dữ liệu quan hệ logic (dành cho PostgreSQL)

-- Định nghĩa ENUM
CREATE TYPE user_role AS ENUM ('student', 'lecturer', 'admin');
CREATE TYPE course_type AS ENUM ('theory', 'practice', 'project');
CREATE TYPE schedule_type AS ENUM ('lecture', 'exam');
CREATE TYPE enrollment_status AS ENUM ('active', 'withdrawn');
CREATE TYPE grade_review_status AS ENUM ('pending', 'approved', 'rejected');

-- 1. Người dùng
CREATE TABLE NguoiDung (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(100),
    role user_role NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 2. Sinh viên
CREATE TABLE SinhVien (
    student_id INT PRIMARY KEY,
    user_id INT REFERENCES NguoiDung(user_id),
    enrollment_year INT,
    major VARCHAR(100)
);

-- 3. Giảng viên
CREATE TABLE GiangVien (
    lecturer_id INT PRIMARY KEY,
    user_id INT REFERENCES NguoiDung(user_id),
    department VARCHAR(100)
);

-- 4. Chương trình đào tạo
CREATE TABLE ChuongTrinhDaoTao (
    curriculum_id INT PRIMARY KEY,
    program_name VARCHAR(100),
    description TEXT,
    academic_year VARCHAR(10)
);

-- 5. Môn học
CREATE TABLE MonHoc (
    course_id INT PRIMARY KEY,
    course_code VARCHAR(10) UNIQUE,
    course_name VARCHAR(100),
    credits INT,
    is_mandatory BOOLEAN,
    course_type course_type,
    curriculum_id INT REFERENCES ChuongTrinhDaoTao(curriculum_id)
);

-- 6. Tiên quyết
CREATE TABLE MonHocTienQuyet (
    course_id INT REFERENCES MonHoc(course_id),
    prerequisite_id INT REFERENCES MonHoc(course_id),
    PRIMARY KEY (course_id, prerequisite_id)
);

-- 7. Lớp học phần
CREATE TABLE LopHocPhan (
    class_id INT PRIMARY KEY,
    course_id INT REFERENCES MonHoc(course_id),
    semester VARCHAR(10),
    academic_year VARCHAR(10),
    lecturer_id INT REFERENCES GiangVien(lecturer_id),
    max_SinhVien INT
);

-- 8. Lịch học / thi
CREATE TABLE ThoiKhoaBieu (
    schedule_id INT PRIMARY KEY,
    class_id INT REFERENCES LopHocPhan(class_id),
    type schedule_type,
    date DATE,
    start_time TIME,
    end_time TIME,
    location VARCHAR(100)
);

-- 9. Đăng ký học phần
CREATE TABLE DangKyHocPhan (
    student_id INT REFERENCES SinhVien(student_id),
    class_id INT REFERENCES LopHocPhan(class_id),
    registration_date DATE,
    status enrollment_status DEFAULT 'active',
    PRIMARY KEY (student_id, class_id)
);

-- 10. Điểm số
CREATE TABLE Diem (
    student_id INT REFERENCES SinhVien(student_id),
    class_id INT REFERENCES LopHocPhan(class_id),
    grade FLOAT,
    is_reviewed BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (student_id, class_id)
);

-- 11. Học phí
CREATE TABLE HocPhi (
    student_id INT REFERENCES SinhVien(student_id),
    semester VARCHAR(10),
    academic_year VARCHAR(10),
    total_credits INT,
    tuition_fee DECIMAL(10,2),
    is_paid BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (student_id, semester, academic_year)
);

-- 12. Phúc khảo điểm
CREATE TABLE PhucKhao (
    review_id INT PRIMARY KEY,
    student_id INT REFERENCES SinhVien(student_id),
    class_id INT REFERENCES LopHocPhan(class_id),
    reason TEXT,
    request_date DATE,
    result TEXT,
    status grade_review_status DEFAULT 'pending'
);
