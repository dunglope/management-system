# Credit-based Academic Training Management System

This project is a **Credit-based Academic Training Management System** designed for universities using a credit system. It helps manage curriculum, course enrollment, student grades, tuition, schedules, and more, with a focus on flexibility, security, and scalability.

---

## Features

### Student Features
- Secure login with 2FA
- Online course registration
- View personal timetable
- Track grades and GPA
- Request grade review
- View tuition fees and payment status

### Lecturer Features
- Login and manage assigned courses
- Enter student grades
- View student lists per class
- Respond to grade review requests

### Admin Features
- Manage users: students, lecturers, admin
- Define training programs and curricula
- Manage courses, prerequisites, and course types
- Open course classes each semester
- Auto-generate schedules and handle conflicts
- Calculate tuition based on credit load
- View system statistics and reports

---

## Technologies Used

| Layer         | Stack                                  |
|---------------|----------------------------------------|
| Frontend      | React                                  |
| Backend       | Node.js with Express                   |
| Database      | PostgreSQL                             |

---

## System Architecture

- RESTful API with layered architecture
- Role-based access control
- PostgreSQL relational schema with referential integrity
- JSON Web Tokens for session handling

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/credit-based-training-system.git
cd credit-based-training-system
```

### 2. Backend Setup
#### Environment Configuration
Create a ```.env``` file in the ```/backend``` directory:
```env
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/education_system
JWT_SECRET=your_jwt_secret
GOOGLE_AUTH_SECRET=your_google_authenticator_secret
```

#### Install Dependencies and Start
```bash
cd backend
npm install
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

## Database Setup


## Workflow Example
#### Student registers for a course:
1. Logs in via frontend UI
2. Views available course classes
3. Selects courses to enroll
4. System checks for:
5. Prerequisites
6. Time conflicts
7. Max class size
8. Updates enrollment records
9. Updates tuition fees
