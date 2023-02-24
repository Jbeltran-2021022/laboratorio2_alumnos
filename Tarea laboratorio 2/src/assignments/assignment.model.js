'use strict'

const mongoose = require('mongoose')

const assignmentSchema = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    idCourseOne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    idCourseTwo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    idCourseThree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    }
    
});

module.exports = mongoose.model('Assignment', assignmentSchema);