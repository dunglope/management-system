import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const Curriculums = () => {
    const [curriculums, setCurriculums] = useState([]);
    const [newCurriculum, setNewCurriculum] = useState({
        program_name: '',
        description: '',
        academic_year: '',
    });
    const [errors, setErrors] = useState({});
    const user = JSON.parse(atob(localStorage.getItem('token')?.split('.')[1] || '{}'));

    useEffect(() => {
        fetchCurriculums();
    }, []);

    const fetchCurriculums = async () => {
        try {
            const response = await api.get('/curriculums');
            setCurriculums(response.data);
        } catch (err) {
            toast.error('Failed to fetch curriculums');
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!newCurriculum.program_name) newErrors.program_name = 'Program name is required';
        if (!newCurriculum.academic_year) newErrors.academic_year = 'Academic year is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateCurriculum = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            await api.post('/curriculums', newCurriculum);
            toast.success('Curriculum created successfully');
            setNewCurriculum({ program_name: '', description: '', academic_year: '' });
            fetchCurriculums();
        } catch (err) {
            toast.error('Failed to create curriculum');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Curriculum Management</h2>
            {user.role === 'admin' && (
                <form onSubmit={handleCreateCurriculum} className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Program Name"
                                value={newCurriculum.program_name}
                                onChange={(e) => setNewCurriculum({ ...newCurriculum, program_name: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            {errors.program_name && <p className="text-red-500 text-sm">{errors.program_name}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Academic Year"
                                value={newCurriculum.academic_year}
                                onChange={(e) => setNewCurriculum({ ...newCurriculum, academic_year: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            {errors.academic_year && <p className="text-red-500 text-sm">{errors.academic_year}</p>}
                        </div>
                        <textarea
                            placeholder="Description"
                            value={newCurriculum.description}
                            onChange={(e) => setNewCurriculum({ ...newCurriculum, description: e.target.value })}
                            className="w-full p-2 border rounded col-span-2"
                        />
                    </div>
                    <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">
                        Add Curriculum
                    </button>
                </form>
            )}
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Program Name</th>
                        <th className="border p-2">Academic Year</th>
                        <th className="border p-2">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {curriculums.map((curriculum) => (
                        <tr key={curriculum.curriculum_id}>
                            <td className="border p-2">{curriculum.program_name}</td>
                            <td className="border p-2">{curriculum.academic_year}</td>
                            <td className="border p-2">{curriculum.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Curriculums;