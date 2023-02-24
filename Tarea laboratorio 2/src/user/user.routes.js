'use strict'
const express = require('express');
const api = express.Router();
const userController = require('./user.controller');
const {ensureAuth, isMaestro} = require('../services/authenticated');


api.get('/test', userController.test);
api.post('/register',userController.register);
api.post('/save', [ensureAuth, isMaestro], userController.save);
api.post('/login', userController.login);
api.put('/update/:id', ensureAuth,userController.update);
api.delete('/delete/:id', ensureAuth,userController.delete);
module.exports = api;