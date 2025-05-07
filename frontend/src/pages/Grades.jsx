import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const Grades = () => {
    const [grades, setGrades] = useState([]);
    const [newReview, setNewReview] = useState({ class_id: '', reason: '' });
    const [errors, setErrors] = useState({});
    const user = JSON.parse(atob(localStorage.getItem('token')?.split('.')[1] || '{}'));

    useEffect(() => {
        fetchGrades();
    }, []);

    const fetchGrades = async () => {
        try {
            const response = await api.get(`/grades/student/${user.id}`);
            setGrades(response.data);
        } catch (err) {
            toast.error('Failed to fetch grades');
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!newReview.class_id) newErrors.class_id = 'Class selection is required';
        if (!newReview.reason) newErrors.reason = 'Reason is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRequestReview = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            await api.post('/grades/review', { student_id: user.id, ...newReview });
            toast.success('Review requested successfully');
            setNewReview({ class_id: '', reason: '' });
        } catch (err) {
            toast.error('Failed to request review');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Grade Management</h2>
            {user.role === 'student' && (
                <form onSubmit={handleRequestReview} className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <select
                                value={newReview.class_id}
                                onChange={(e) => setNewReview({ ...newReview, class_id: e.target.value })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Class</option>
                                {grades.map((grade) => (
                                    <option key={grade.class_id} value={grade.class_id}>
                                        {grade.course_name}
                                    </option>
                                ))}
                            </select>
                            {errors.class_id && <p className="text-red-500 text-sm">{errors.class_id}</p>}
                        </div>
                        <div>
                            <textarea
                                placeholder="Reason for review"
                                value={newReview.reason}
                                onChange={(e) => setNewReview({ ...newReview, reason: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
                        </div>
                    </div>
                    <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">
                        Request Review
                    </button>
                </form>
            )}
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Course</th>
                        <th className="border p-2">Semester</th>
                        <th className="border p-2">Grade</th>
                        <th className="border p-2">Reviewed</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map((grade) => (
                        <tr key={grade.class_id}>
                            <td className="border p-2">{grade.course_name}</td>
                            <td className="border p-2">{grade.semester} {grade.academic_year}</td>
                            <td className="border p-2">{grade.grade}</td>
                            <td className="border p-2">{grade.is_reviewed ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Grades;