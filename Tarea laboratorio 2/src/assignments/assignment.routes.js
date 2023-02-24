'use strict'
const express = require('express');
const api = express.Router();
const assignmentController = require('./assignment.controller');
const {ensureAuth} = require('../services/authenticated');

//Ruta de testeo
api.get('/test', assignmentController.test);
api.post('/add',ensureAuth,assignmentController.addAssignment);
api.get('/get', ensureAuth, assignmentController.getAssignments);
module.exports = api;