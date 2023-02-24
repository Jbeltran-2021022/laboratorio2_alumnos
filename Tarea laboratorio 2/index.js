'use strict'

require('dotenv').config()
const { application } = require('express');
const mongoConfig = require('./configs/mongo');
const app = require('./configs/app');
const courseController = require('./src/course/course.controller');
mongoConfig.connect();
app.initServer();
courseController.defaultCourse();