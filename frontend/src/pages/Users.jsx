import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        full_name: '',
        email: '',
        role: 'student',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (err) {
            toast.error('Failed to fetch users');
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!newUser.username) newErrors.username = 'Username is required';
        if (!newUser.password || newUser.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (!newUser.full_name) newErrors.full_name = 'Full name is required';
        if (!newUser.email || !/\S+@\S+\.\S+/.test(newUser.email)) newErrors.email = 'Valid email is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            await api.post('/users/register', newUser);
            toast.success('User created successfully');
            setNewUser({ username: '', password: '', full_name: '', email: '', role: 'student' });
            fetchUsers();
        } catch (err) {
            toast.error('Failed to create user');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <form onSubmit={handleCreateUser} className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={newUser.full_name}
                            onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                        {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name}</p>}
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="p-2 border rounded"
                    >
                        <option value="student">Student</option>
                        <option value="lecturer">Lecturer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">
                    Add User
                </button>
            </form>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Username</th>
                        <th className="border p-2">Full Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.user_id}>
                            <td className="border p-2">{user.username}</td>
                            <td className="border p-2">{user.full_name}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;