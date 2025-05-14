import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ user, handleLogout }) => {
    const links = [
        { path: '/admin', label: 'Admin Dashboard', roles: ['admin'] },
        { path: '/dashboard', label: 'Dashboard', roles: ['admin', 'lecturer', 'student'] },
        { path: '/users', label: 'User Management', roles: ['admin'] },
        { path: '/curriculums', label: 'Curriculums', roles: ['admin', 'lecturer', 'student'] },
        { path: '/courses', label: 'Courses', roles: ['admin', 'lecturer', 'student'] },
        { path: '/enrollments', label: 'Enrollments', roles: ['student'] },
        { path: '/grades', label: 'Grades', roles: ['student', 'lecturer'] },
        { path: '/tuition', label: 'Tuition', roles: ['student', 'admin'] },
        { path: '/schedules', label: 'Schedules', roles: ['student', 'lecturer'] },
        { path: '/reports', label: 'Reports', roles: ['admin', 'lecturer', 'student'] },
    ];

    return (
        <div className="w-64 bg-blue-800 text-white h-screen p-4">
            <h2 className="text-xl font-bold mb-6">Brainrot Academy</h2>
            <p className="mb-4">Welcome, {user.username} ({user.role})</p>
            <nav>
                {links.map((link) => (
                    link.roles.includes(user.role) && (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `block py-2 px-4 mb-2 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    )
                ))}
            </nav>
            <button
                onClick={handleLogout}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;