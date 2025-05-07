import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({ students: 0, courses: 0, enrollments: 0 });
    const user = JSON.parse(atob(localStorage.getItem('token')?.split('.')[1] || '{}'));

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const requests = [];

                // Only admins can fetch total students
                if (user.role === 'admin') {
                    requests.push(api.get('/users?role=student'));
                } else {
                    requests.push(Promise.resolve({ data: [] })); // Placeholder for non-admins
                }

                // Fetch courses for all roles
                requests.push(api.get('/courses'));

                // Fetch enrollments for students
                if (user.role === 'student') {
                    requests.push(api.get(`/enrollments/student/${user.id}`));
                } else {
                    requests.push(Promise.resolve({ data: [] })); // Placeholder for non-students
                }

                const [studentsRes, coursesRes, enrollmentsRes] = await Promise.all(requests);

                setStats({
                    students: user.role === 'admin' ? studentsRes.data.length : 0,
                    courses: coursesRes.data.length,
                    enrollments: user.role === 'student' ? enrollmentsRes.data.length : 0,
                });
            } catch (err) {
                if (err.response?.status === 403) {
                    toast.error('You are not authorized to view some statistics');
                } else {
                    toast.error('Failed to load dashboard stats');
                }
            }
        };

        if (user.id) {
            fetchStats();
        }
    }, [user]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {user.role === 'admin' && (
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Total Students</h3>
                        <p className="text-2xl">{stats.students}</p>
                    </div>
                )}
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Total Courses</h3>
                    <p className="text-2xl">{stats.courses}</p>
                </div>
                {user.role === 'student' && (
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold">Your Enrollments</h3>
                        <p className="text-2xl">{stats.enrollments}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;