import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const Enrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [classes, setClasses] = useState([]);
    const [newEnrollment, setNewEnrollment] = useState({ class_id: '' });
    const [errors, setErrors] = useState({});
    const user = JSON.parse(atob(localStorage.getItem('token')?.split('.')[1] || '{}'));

    useEffect(() => {
        fetchEnrollments();
        fetchClasses();
    }, []);

    const fetchEnrollments = async () => {
        try {
            const response = await api.get(`/enrollments/student/${user.id}`);
            setEnrollments(response.data);
        } catch (err) {
            toast.error('Failed to fetch enrollments');
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await api.get('/courses');
            const classPromises = response.data.map((course) =>
                api.get(`/courses/classes?course_id=${course.course_id}`)
            );
            const classResponses = await Promise.all(classPromises);
            const allClasses = classResponses.flatMap((res) => res.data);
            setClasses(allClasses);
        } catch (err) {
            toast.error('Failed to fetch classes');
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!newEnrollment.class_id) newErrors.class_id = 'Class selection is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEnroll = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            await api.post('/enrollments', { student_id: user.id, class_id: newEnrollment.class_id });
            toast.success('Enrolled successfully');
            setNewEnrollment({ class_id: '' });
            fetchEnrollments();
        } catch (err) {
            toast.error('Failed to enroll');
        }
    };

    const handleCancel = async (class_id) => {
        try {
            await api.delete(`/enrollments/${user.id}/${class_id}`);
            toast.success('Enrollment cancelled');
            fetchEnrollments();
        } catch (err) {
            toast.error('Failed to cancel enrollment');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Enrollment Management</h2>
            <form onSubmit={handleEnroll} className="mb-6">
                <div>
                    <select
                        value={newEnrollment.class_id}
                        onChange={(e) => setNewEnrollment({ ...newEnrollment, class_id: e.target.value })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Class</option>
                        {classes.map((cls) => (
                            <option key={cls.class_id} value={cls.class_id}>
                                {cls.course_name} - {cls.semester} {cls.academic_year}
                            </option>
                        ))}
                    </select>
                    {errors.class_id && <p className="text-red-500 text-sm">{errors.class_id}</p>}
                </div>
                <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">
                    Enroll
                </button>
            </form>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Course</th>
                        <th className="border p-2">Semester</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map((enrollment) => (
                        <tr key={enrollment.class_id}>
                            <td className="border p-2">{enrollment.course_name}</td>
                            <td className="border p-2">{enrollment.semester} {enrollment.academic_year}</td>
                            <td className="border p-2">{enrollment.status}</td>
                            <td className="border p-2">
                                {enrollment.status === 'active' && (
                                    <button
                                        onClick={() => handleCancel(enrollment.class_id)}
                                        className="bg-red-500 text-white p-1 rounded"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Enrollments;