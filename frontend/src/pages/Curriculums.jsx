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
    const [editCurriculum, setEditCurriculum] = useState(null);
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
            toast.error(err.message || 'Failed to fetch curriculums');
        }
    };

    const validateForm = (curriculum) => {
        const newErrors = {};
        if (!curriculum.program_name) newErrors.program_name = 'Program name is required';
        if (!curriculum.academic_year) newErrors.academic_year = 'Academic year is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateCurriculum = async (e) => {
        e.preventDefault();
        if (!validateForm(newCurriculum)) return;
        try {
            await api.post('/curriculums', newCurriculum);
            toast.success('Curriculum created successfully');
            setNewCurriculum({ program_name: '', description: '', academic_year: '' });
            fetchCurriculums();
        } catch (err) {
            toast.error(err.message || 'Failed to create curriculum');
        }
    };

    const handleEditCurriculum = async (e) => {
        e.preventDefault();
        if (!validateForm(editCurriculum)) return;
        try {
            await api.put(`/curriculums/${editCurriculum.curriculum_id}`, editCurriculum);
            toast.success('Curriculum updated successfully');
            setEditCurriculum(null);
            fetchCurriculums();
        } catch (err) {
            toast.error(err.message || 'Failed to update curriculum');
        }
    };

    const handleDeleteCurriculum = async (id) => {
        if (!window.confirm('Are you sure you want to delete this curriculum?')) return;
        try {
            await api.delete(`/curriculums/${id}`);
            toast.success('Curriculum deleted successfully');
            fetchCurriculums();
        } catch (err) {
            toast.error(err.message || 'Failed to delete curriculum');
        }
    };

    const openEditModal = (curriculum) => {
        setEditCurriculum({ ...curriculum });
    };

    const closeEditModal = () => {
        setEditCurriculum(null);
        setErrors({});
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
                        {user.role === 'admin' && <th className="border p-2">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {curriculums.map((curriculum) => (
                        <tr key={curriculum.curriculum_id}>
                            <td className="border p-2">{curriculum.program_name}</td>
                            <td className="border p-2">{curriculum.academic_year}</td>
                            <td className="border p-2">{curriculum.description}</td>
                            {user.role === 'admin' && (
                                <td className="border p-2">
                                    <button
                                        onClick={() => openEditModal(curriculum)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCurriculum(curriculum.curriculum_id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {editCurriculum && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Edit Curriculum</h3>
                        <form onSubmit={handleEditCurriculum}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Program Name</label>
                                <input
                                    type="text"
                                    value={editCurriculum.program_name}
                                    onChange={(e) => setEditCurriculum({ ...editCurriculum, program_name: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                                {errors.program_name && <p className="text-red-500 text-sm">{errors.program_name}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Academic Year</label>
                                <input
                                    type="text"
                                    value={editCurriculum.academic_year}
                                    onChange={(e) => setEditCurriculum({ ...editCurriculum, academic_year: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                                {errors.academic_year && <p className="text-red-500 text-sm">{errors.academic_year}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    value={editCurriculum.description}
                                    onChange={(e) => setEditCurriculum({ ...editCurriculum, description: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="bg-gray-500 text-white p-2 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Curriculums;