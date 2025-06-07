// build your `/api/projects` router here
// POST
// GET

const express = require('express');
const helpers = require('./model');

const router = express.Router();

router.get('/', (req, res, next) => {
    helpers.getProjects()
        .then(projects => {
            const cleanedProject = projects.map(project => ({
                ...project,
                project_completed: project.project_completed === 1
            }));
            res.status(200).json(cleanedProject);
        })
        .catch(next)
});

router.post('/', (req, res, next) => {
    helpers.createProject(req.body)
        .then(project => {
            const cleanedProject = {
                ...project,
                project_completed: project.project_completed === 1
            }
            res.status(201).json(cleanedProject);
        })
        .catch(next);
});



module.exports = router;