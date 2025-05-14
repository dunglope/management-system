import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Users from './pages/Users';
import Curriculums from './pages/Curriculums';
import Courses from './pages/Courses';
import Enrollments from './pages/Enrollments';
import Grades from './pages/Grades';
import Tuition from './pages/Tuition';
import Schedules from './pages/Schedules';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route element={<App />}>
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute roles={['admin']}><Admin /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute roles={['admin']}><Users /></ProtectedRoute>} />
                <Route path="/curriculums" element={<ProtectedRoute roles={['admin', 'lecturer', 'student']}><Curriculums /></ProtectedRoute>} />
                <Route path="/courses" element={<ProtectedRoute roles={['admin', 'lecturer', 'student']}><Courses /></ProtectedRoute>} />
                <Route path="/enrollments" element={<ProtectedRoute roles={['student']}><Enrollments /></ProtectedRoute>} />
                <Route path="/grades" element={<ProtectedRoute roles={['student', 'lecturer']}><Grades /></ProtectedRoute>} />
                <Route path="/tuition" element={<ProtectedRoute roles={['student', 'admin']}><Tuition /></ProtectedRoute>} />
                <Route path="/schedules" element={<ProtectedRoute roles={['student', 'lecturer']}><Schedules /></ProtectedRoute>} />
                <Route path="/reports" element={<ProtectedRoute roles={['admin', 'lecturer', 'student']}><Reports /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
);