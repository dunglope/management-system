import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const Reports = () => {
    const [progress, setProgress] = useState([]);
    const user = JSON.parse(atob(localStorage.getItem('token')?.split('.')[1] || '{}'));

    useEffect(() => {
        fetchProgress();
    }, []);

    const fetchProgress = async () => {
        try {
            const response = await api.get(`/reports/student-progress/${user.id}`);
            setProgress(response.data);
        } catch (err) {
            toast.error('Failed to fetch progress report');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Student Progress Report</h2>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Course</th>
                        <th className="border p-2">Semester</th>
                        <th className="border p-2">Academic Year</th>
                        <th className="border p-2">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {progress.map((item, index) => (
                        <tr key={index}>
                            <td className="border p-2">{item.course_name}</td>
                            <td className="border p-2">{item.semester}</td>
                            <td className="border p-2">{item.academic_year}</td>
                            <td className="border p-2">{item.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reports;