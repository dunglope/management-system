import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const Schedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [classes, setClasses] = useState([]);
    const [newSchedule, setNewSchedule] = useState({
        class_id: '',
        type: 'lecture',
        date: '',
        start_time: '',
        end_time: '',
        location: '',
    });
    const [errors, setErrors] = useState({});
    const user = JSON.parse(atob(localStorage.getItem('token')?.split('.')[1] || '{}'));

    useEffect(() => {
        fetchClasses();
        fetchSchedules();
    }, []);

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

    const fetchSchedules = async () => {
        try {
            const response = await api.get('/schedules/class/0'); // Adjust based on user role
            setSchedules(response.data);
        } catch (err) {
            toast.error('Failed to fetch schedules');
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!newSchedule.class_id) newErrors.class_id = 'Class is required';
        if (!newSchedule.date) newErrors.date = 'Date is required';
        if (!newSchedule.start_time) newErrors.start_time = 'Start time is required';
        if (!newSchedule.end_time) newErrors.end_time = 'End time is required';
        if (!newSchedule.location) newErrors.location = 'Location is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCreateSchedule = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            await api.post('/schedules', newSchedule);
            toast.success('Schedule created successfully');
            setNewSchedule({ class_id: '', type: 'lecture', date: '', start_time: '', end_time: '', location: '' });
            fetchSchedules();
        } catch (err) {
            toast.error('Failed to create schedule');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Schedule Management</h2>
            {user.role === 'admin' && (
                <form onSubmit={handleCreateSchedule} className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <select
                                value={newSchedule.class_id}
                                onChange={(e) => setNewSchedule({ ...newSchedule, class_id: e.target.value })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Class</option>
                                {classes.map((cls) => (
                                    <option key={cls.class_id} value={cls.class_id}>
                                        {cls.course_name} - {cls.semester}
                                    </option>
                                ))}
                            </select>
                            {errors.class_id && <p className="text-red-500 text-sm">{errors.class_id}</p>}
                        </div>
                        <div>
                            <select
                                value={newSchedule.type}
                                onChange={(e) => setNewSchedule({ ...newSchedule, type: e.target.value })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="lecture">Lecture</option>
                                <option value="exam">Exam</option>
                            </select>
                        </div>
                        <div>
                            <input
                                type="date"
                                value={newSchedule.date}
                                onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                        </div>
                        <div>
                            <input
                                type="time"
                                value={newSchedule.start_time}
                                onChange={(e) => setNewSchedule({ ...newSchedule, start_time: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            {errors.start_time && <p className="text-red-500 text-sm">{errors.start_time}</p>}
                        </div>
                        <div>
                            <input
                                type="time"
                                value={newSchedule.end_time}
                                onChange={(e) => setNewSchedule({ ...newSchedule, end_time: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            {errors.end_time && <p className="text-red-500 text-sm">{errors.end_time}</p>}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Location"
                                value={newSchedule.location}
                                onChange={(e) => setNewSchedule({ ...newSchedule, location: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                        </div>
                    </div>
                    <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded">
                        Add Schedule
                    </button>
                </form>
            )}
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Class</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Time</th>
                        <th className="border p-2">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule) => (
                        <tr key={schedule.schedule_id}>
                            <td className="border p-2">{schedule.class_id}</td>
                            <td className="border p-2">{schedule.type}</td>
                            <td className="border p-2">{schedule.date}</td>
                            <td className="border p-2">{schedule.start_time} - {schedule.end_time}</td>
                            <td className="border p-2">{schedule.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Schedules;