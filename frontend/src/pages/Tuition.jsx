import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const Tuition = () => {
    const [tuitions, setTuitions] = useState([]);
    const user = JSON.parse(atob(localStorage.getItem('token')?.split('.')[1] || '{}'));

    useEffect(() => {
        fetchTuitions();
    }, []);

    const fetchTuitions = async () => {
        try {
            const response = await api.get(`/tuition student/${user.id}`);
            setTuitions(response.data);
        } catch (err) {
            toast.error('Failed to fetch tuition records');
        }
    };

    const handlePay = async (tuition) => {
        try {
            await api.put(`/tuition/pay/${user.id}/${tuition.semester}/${tuition.academic_year}`);
            toast.success('Tuition marked as paid');
            fetchTuitions();
        } catch (err) {
            toast.error('Failed to update tuition payment');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Tuition Management</h2>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Semester</th>
                        <th className="border p-2">Academic Year</th>
                        <th className="border p-2">Credits</th>
                        <th className="border p-2">Fee</th>
                        <th className="border p-2">Status</th>
                        {user.role === 'admin' && <th className="border p-2">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {tuitions.map((tuition) => (
                        <tr key={`${tuition.student_id}-${tuition.semester}-${tuition.academic_year}`}>
                            <td className="border p-2">{tuition.semester}</td>
                            <td className="border p-2">{tuition.academic_year}</td>
                            <td className="border p-2">{tuition.total_credits}</td>
                            <td className="border p-2">{tuition.tuition_fee}</td>
                            <td className="border p-2">{tuition.is_paid ? 'Paid' : 'Unpaid'}</td>
                            {user.role === 'admin' && (
                                <td className="border p-2">
                                    {!tuition.is_paid && (
                                        <button
                                            onClick={() => handlePay(tuition)}
                                            className="bg-green-500 text-white p-1 rounded"
                                        >
                                            Mark as Paid
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tuition;