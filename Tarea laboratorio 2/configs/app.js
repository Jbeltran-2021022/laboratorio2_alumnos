'use strict'

const express = require('express');
//Logs de las solicitudes que recibe el servidor
const morgan = require('morgan');
//Seguridad basica al servidor
const helmet = require('helmet');
//Aceptacion de solicitudes
const cors = require('cors');
//Instancia de express
const app = express();
const port = process.env.PORT || 8080;
const userRoutes = require('../src/user/user.routes');
const courseRoutes = require('../src/course/course.routes');
const assignmentRoutes = require('../src/assignments/assignment.routes'); 

//Configurar el servidor HTTP De Express
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use('/user', userRoutes);
app.use('/course', courseRoutes);
app.use('/assignment', assignmentRoutes);  

//Funcion desde que se levanta el servidor
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Servidor corriendo en el puerto ${port}`)
}