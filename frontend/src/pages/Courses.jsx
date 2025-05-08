import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('/courses');
                setCourses(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                toast.error('Failed to fetch courses');
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Courses</h1>
            {courses.length === 0 ? (
                <p>No courses available</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course) => (
                        <div key={course.course_id} className="border p-4 rounded shadow">
                            <h2 className="text-xl font-semibold">{course.course_name}</h2>
                            <p><strong>Code:</strong> {course.course_code}</p>
                            <p><strong>Credits:</strong> {course.credits}</p>
                            <p><strong>Type:</strong> {course.course_type}</p>
                            <p><strong>Mandatory:</strong> {course.is_mandatory ? 'Yes' : 'No'}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Courses;