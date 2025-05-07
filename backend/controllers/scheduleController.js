const scheduleService = require('../services/scheduleService');

const createSchedule = async (req, res, next) => {
    try {
        const { class_id, type, date, start_time, end_time, location } = req.body;
        const schedule = await scheduleService.createSchedule({ class_id, type, date, start_time, end_time, location });
        res.status(201).json(schedule);
    } catch (error) {
        next(error);
    }
};

const getClassSchedules = async (req, res, next) => {
    try {
        const schedules = await scheduleService.getClassSchedules(req.params.classId);
        res.json(schedules);
    } catch (error) {
        next(error);
    }
};

const updateSchedule = async (req, res, next) => {
    try {
        const schedule = await scheduleService.updateSchedule(req.params.id, req.body);
        res.json(schedule);
    } catch (error) {
        next(error);
    }
};

const deleteSchedule = async (req, res, next) => {
    try {
        await scheduleService.deleteSchedule(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSchedule,
    getClassSchedules,
    updateSchedule,
    deleteSchedule
};