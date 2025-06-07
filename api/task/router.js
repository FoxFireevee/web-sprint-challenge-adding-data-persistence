// build your `/api/tasks` router here
// POST
// GET

const express = require('express');
const helpers = require('./model');

const router = express.Router();

router.get('/', (req, res, next) => {
    helpers.getTasks()
        .then(tasks => {
            const cleanedTasks = tasks.map(task => ({
                ...task,
                task_completed: task.task_completed === 1
            }))
            res.status(200).json(cleanedTasks);
        })
        .catch(next);
});

router.post('/', (req, res, next) => {
    helpers.createTasks(req.body)
        .then(task => {
            const cleanedTask = {
                ...task,
                task_completed: task.task_completed === 1
            }
            res.status(201).json(cleanedTask);
        })
        .catch(next);
});

module.exports = router;