'use strict'
const express = require('express');
const api = express.Router();
const courseController = require('./course.controller');
const {ensureAuth, isMaestro} = require('../services/authenticated');

api.get('/test', courseController.test);
api.post('/add',[ensureAuth, isMaestro],courseController.addCourse);
api.get('/get', [ensureAuth, isMaestro], courseController.getCourses);
api.put('/update/:id', [ensureAuth, isMaestro],courseController.updateCourse);
api.delete('/delete/:id', [ensureAuth, isMaestro],courseController.deleteCourse);
module.exports = api;