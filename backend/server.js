const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./utils/errorHandler');
const userRoutes = require('./routes/user');
const curriculumRoutes = require('./routes/curriculum');
const courseRoutes = require('./routes/course');
const enrollmentRoutes = require('./routes/enrollment');
const gradeRoutes = require('./routes/grade');
const tuitionRoutes = require('./routes/tuition');
const scheduleRoutes = require('./routes/schedule');
const reportRoutes = require('./routes/report');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/curriculums', curriculumRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/tuitions', tuitionRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/reports', reportRoutes);


// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});