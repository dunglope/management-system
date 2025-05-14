import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [curriculums, setCurriculums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 7;
    const [newCourse, setNewCourse] = useState({
        course_id: '',
        course_code: '',
        course_name: '',
        credits: '',
        is_mandatory: false,
        course_type: '',
        curriculum_id: ''
    });
    const [editCourse, setEditCourse] = useState(null);
    const [errors, setErrors] = useState({});
    const user = JSON.parse(atob(localStorage.getItem('token')?.split('.')[1] || '{}'));

    useEffect(() => {
        fetchCourses();
        if (user.role === 'admin') {
            fetchCurriculums();
            fetchNextCourseId();
        }
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await api.get('/courses');
            setCourses(response.data);
            setCurrentPage(1); // Reset to page 1 on fetch
        } catch (err) {
            toast.error(err.message || 'Failed to fetch courses');
        }
    };

    const fetchCurriculums = async () => {
        try {
            const response = await api.get('/curriculums');
            setCurriculums(response.data);
        } catch (err) {
            toast.error(err.message || 'Failed to fetch curriculums');
        }
    };

    const fetchNextCourseId = async () => {
        try {
            const response = await api.get('/courses/next-id');
            setNewCourse((prev) => ({ ...prev, course_id: response.data.nextId.toString() }));
        } catch (err) {
            toast.error(err.message || 'Failed to fetch next course ID');
        }
    };

    const validateForm = (course) => {
        const newErrors = {};
        if (!course.course_id || course.course_id <= 0) newErrors.course_id = 'Valid course ID is required';
        if (!course.course_code || course.course_code.length > 10) newErrors.course_code = 'Course code is required and must be at most 10 characters';
        if (!course.course_name) newErrors.course_name = 'Course name is required';
        if (!course.credits || course.credits <= 0) newErrors.credits = 'Valid credits are required';
        if (course.is_mandatory === undefined) newErrors.is_mandatory = 'Mandatory status is required';
        if (!course.course_type) newErrors.course_type = 'Course type is required';
        if (!course.curriculum_id) newErrors.curriculum_id = 'Curriculum is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        if (!validateForm(newCourse)) return;
        try {
            await api.post('/courses', {
                ...newCourse,
                course_id: parseInt(newCourse.course_id),
                credits: parseInt(newCourse.credits)
            });
            toast.success('Course created successfully');
            setNewCourse({
                course_id: '',
                course_code: '',
                course_name: '',
                credits: '',
                is_mandatory: false,
                course_type: '',
                curriculum_id: ''
            });
            fetchCourses();
            fetchNextCourseId();
        } catch (err) {
            toast.error(err.message || 'Failed to create course');
        }
    };

    const handleEditCourse = async (e) => {
        e.preventDefault();
        if (!validateForm(editCourse)) return;
        try {
            await api.put(`/courses/${editCourse.course_id}`, {
                ...editCourse,
                credits: parseInt(editCourse.credits)
            });
            toast.success('Course updated successfully');
            setEditCourse(null);
            fetchCourses();
        } catch (err) {
            toast.error(err.message || 'Failed to update course');
        }
    };

    const handleDeleteCourse = async (id) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return;
        try {
            await api.delete(`/courses/${id}`);
            toast.success('Course deleted successfully');
            fetchCourses();
        } catch (err) {
            toast.error(err.message || 'Failed to delete course');
        }
    };

    const openEditModal = (course) => {
        setEditCourse({
            ...course,
            credits: course.credits.toString(),
            course_id: course.course_id.toString()
        });
    };

    const closeEditModal = () => {
        setEditCourse(null);
        setErrors({});
    };

    // Pagination logic
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
    const totalPages = Math.ceil(courses.length / coursesPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Course Management</h2>
            {user.role === 'admin' && (
                <form onSubmit={handleCreateCourse} className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input
                                type="number"
                                placeholder="Course ID"
                                value={newCourse.course_id}
                                onChange={(e) => setNewCourse({ ...newCourse, course_id: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            {errors.course_id && <p className="text-red-500 text-sm">{errors.course_id}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Course Code"
                                value={newCourse.course_code}
                                onChange={(e) => setNewCourse({ ...newCourse, course_code: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            {errors.course_code && <p className="text-red-500 text-sm">{errors.course_code}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Course Name"
                                value={newCourse.course_name}
                                onChange={(e) => setNewCourse({ ...newCourse, course_name: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            {errors.course_name && <p className="text-red-500 text-sm">{errors.course_name}</p>}
                        </div>
                        <div>
                            <input
                                type="number"
                                placeholder="Credits"
                                value={newCourse.credits}
                                onChange={(e) => setNewCourse({ ...newCourse, credits: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            {errors.credits && <p className="text-red-500 text-sm">{errors.credits}</p>}
                        </div>
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={newCourse.is_mandatory}
                                    onChange={(e) => setNewCourse({ ...newCourse, is_mandatory: e.target.checked })}
                                    className="mr-2"
                                />
                                Mandatory
                            </label>
                            {errors.is_mandatory && <p className="text-red-500 text-sm">{errors.is_mandatory}</p>}
                        </div>
                        <div>
                            <select
                                value={newCourse.course_type}
                                onChange={(e) => setNewCourse({ ...newCourse, course_type: e.target.value })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Course Type</option>
                                <option value="theory">Theory</option>
                                <option value="practice">Practice</option>
                                <option value="project">Project</option>
                            </select>
                            {errors.course_type && <p className="text-red-500 text-sm">{errors.course_type}</p>}
                        </div>
                        <div>
                            <select
                                value={newCourse.curriculum_id}
                                onChange={(e) => setNewCourse({ ...newCourse, curriculum_id: e.target.value })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Curriculum</option>
                                {curriculums.map((curriculum) => (
                                    <option key={curriculum.curriculum_id} value={curriculum.curriculum_id}>
                                        {curriculum.program_name} ({curriculum.academic_year})
                                    </option>
                                ))}
                            </select>
                            {errors.curriculum_id && <p className="text-red-500 text-sm">{errors.curriculum_id}</p>}
                        </div>
                    </div>
                    <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">
                        Add Course
                    </button>
                </form>
            )}
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Course ID</th>
                        <th className="border p-2">Course Code</th>
                        <th className="border p-2">Course Name</th>
                        <th className="border p-2">Credits</th>
                        <th className="border p-2">Mandatory</th>
                        <th className="border p-2">Course Type</th>
                        <th className="border p-2">Curriculum</th>
                        {user.role === 'admin' && <th className="border p-2">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {currentCourses.length === 0 ? (
                        <tr>
                            <td colSpan={user.role === 'admin' ? 8 : 7} className="border p-2 text-center">
                                No courses available
                            </td>
                        </tr>
                    ) : (
                        currentCourses.map((course) => (
                            <tr key={course.course_id}>
                                <td className="border p-2">{course.course_id}</td>
                                <td className="border p-2">{course.course_code}</td>
                                <td className="border p-2">{course.course_name}</td>
                                <td className="border p-2">{course.credits}</td>
                                <td className="border p-2">{course.is_mandatory ? 'Yes' : 'No'}</td>
                                <td className="border p-2">{course.course_type}</td>
                                <td className="border p-2">
                                    {curriculums.find((c) => c.curriculum_id === course.curriculum_id)?.program_name || 'Unknown'}
                                </td>
                                {user.role === 'admin' && (
                                    <td className="border p-2">
                                        <button
                                            onClick={() => openEditModal(course)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCourse(course.course_id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {courses.length > 0 && (
                <div className="mt-4 flex justify-center items-center space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded ${
                            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white'
                        }`}
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded ${
                                currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded ${
                            currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white'
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}

            {editCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Edit Course</h3>
                        <form onSubmit={handleEditCourse}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Course ID (Read-only)</label>
                                <input
                                    type="number"
                                    value={editCourse.course_id}
                                    disabled
                                    className="w-full p-2 border rounded bg-gray-100"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Course Code</label>
                                <input
                                    type="text"
                                    value={editCourse.course_code}
                                    onChange={(e) => setEditCourse({ ...editCourse, course_code: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                                {errors.course_code && <p className="text-red-500 text-sm">{errors.course_code}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Course Name</label>
                                <input
                                    type="text"
                                    value={editCourse.course_name}
                                    onChange={(e) => setEditCourse({ ...editCourse, course_name: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                                {errors.course_name && <p className="text-red-500 text-sm">{errors.course_name}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Credits</label>
                                <input
                                    type="number"
                                    value={editCourse.credits}
                                    onChange={(e) => setEditCourse({ ...editCourse, credits: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                                {errors.credits && <p className="text-red-500 text-sm">{errors.credits}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={editCourse.is_mandatory}
                                        onChange={(e) => setEditCourse({ ...editCourse, is_mandatory: e.target.checked })}
                                        className="mr-2"
                                    />
                                    Mandatory
                                </label>
                                {errors.is_mandatory && <p className="text-red-500 text-sm">{errors.is_mandatory}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Course Type</label>
                                <select
                                    value={editCourse.course_type}
                                    onChange={(e) => setEditCourse({ ...editCourse, course_type: e.target.value })}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Select Course Type</option>
                                    <option value="theory">Theory</option>
                                    <option value="practice">Practice</option>
                                    <option value="project">Project</option>
                                </select>
                                {errors.course_type && <p className="text-red-500 text-sm">{errors.course_type}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Curriculum</label>
                                <select
                                    value={editCourse.curriculum_id}
                                    onChange={(e) => setEditCourse({ ...editCourse, curriculum_id: e.target.value })}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="">Select Curriculum</option>
                                    {curriculums.map((curriculum) => (
                                        <option key={curriculum.curriculum_id} value={curriculum.curriculum_id}>
                                            {curriculum.program_name} ({curriculum.academic_year})
                                        </option>
                                    ))}
                                </select>
                                {errors.curriculum_id && <p className="text-red-500 text-sm">{errors.curriculum_id}</p>}
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

export default Courses;