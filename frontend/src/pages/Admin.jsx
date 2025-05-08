import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

const Admin = () => {
    const [stats, setStats] = useState({ users: 0, curriculums: 0, courses: 0, unpaidTuition: 0 });
    const user = JSON.parse(atob(localStorage.getItem('token')?.split('.')[1] || '{}'));

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [usersRes, curriculumsRes, coursesRes, tuitionRes] = await Promise.all([
                    api.get('/users'),
                    api.get('/curriculums'),
                    api.get('/courses'),
                    api.get('/tuitions/unpaid'),
                ]);
                setStats({
                    users: usersRes.data.length,
                    curriculums: curriculumsRes.data.length,
                    courses: coursesRes.data.length,
                    unpaidTuition: tuitionRes.data.length,
                });
            } catch (err) {
                toast.error('Failed to load admin statistics');
            }
        };

        if (user.role === 'admin') {
            fetchStats();
        }
    }, [user]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Admin Management Interface</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Total Users</h3>
                    <p className="text-2xl">{stats.users}</p>
                    <Link to="/users" className="text-blue-600 hover:underline">Manage Users</Link>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Curriculums</h3>
                    <p className="text-2xl">{stats.curriculums}</p>
                    <Link to="/curriculums" className="text-blue-600 hover:underline">Manage Curriculums</Link>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Courses</h3>
                    <p className="text-2xl">{stats.courses}</p>
                    <Link to="/courses" className="text-blue-600 hover:underline">Manage Courses</Link>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold">Unpaid Tuition</h3>
                    <p className="text-2xl">{stats.unpaidTuition}</p>
                    <Link to="/tuition" className="text-blue-600 hover:underline">Manage Tuition</Link>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
                    <div className="space-y-2">
                        <Link
                            to="/users"
                            className="block bg-blue-600 text-white p-2 rounded text-center hover:bg-blue-700"
                        >
                            Create New User
                        </Link>
                        <Link
                            to="/curriculums"
                            className="block bg-blue-600 text-white p-2 rounded text-center hover:bg-blue-700"
                        >
                            Add Curriculum
                        </Link>
                        <Link
                            to="/courses"
                            className="block bg-blue-600 text-white p-2 rounded text-center hover:bg-blue-700"
                        >
                            Add Course
                        </Link>
                        <Link
                            to="/schedules"
                            className="block bg-blue-600 text-white p-2 rounded text-center hover:bg-blue-700"
                        >
                            Schedule Class
                        </Link>
                    </div>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-2">Reports</h3>
                    <div className="space-y-2">
                        <Link
                            to="/reports"
                            className="block bg-green-600 text-white p-2 rounded text-center hover:bg-green-700"
                        >
                            View Student Progress
                        </Link>
                        <Link
                            to="/tuition"
                            className="block bg-green-600 text-white p-2 rounded text-center hover:bg-green-700"
                        >
                            View Tuition Status
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;