'use strict'
const Assignment = require('./assignment.model');
const Course = require('../course/course.model');
const User = require('../user/user.model');
const { populate } = require('../user/user.model');

exports.test = (req,res)=>{
    res.send({message: 'Test function is running'});
}

exports.addAssignment = async(req, res)=>{
    try{
        //obtener la informacion a agregar
        let data = req.body;
        //validacion si existe el user
        let existsUser = await User.findOne({_id: data.idUser});
        if(!existsUser) return res.status(404).send({message: 'User not found'});//mensaje si si no existe
        //validacion si existe el curso 1
        let existsCourseOne= await Course.findOne({_id: data.idCourseOne});
        if(!existsCourseOne) return res.status(404).send({message: 'Course 1 not found'});//mensaje si si no existe
        //validacion si existe el curso 2
        let existsCourseTwo= await Course.findOne({_id: data.idCourseTwo});
        if(!existsCourseTwo) return res.status(404).send({message: 'Course 2 not found'});//mensaje si si no existe
        //validacion si existe el curso 3
        let existsCourseThree= await Course.findOne({_id: data.idCourseThree});
        if(!existsCourseThree) return res.status(404).send({message: 'Course 3 not found'});//mensaje si si no existe
        let existsAssignments = await Assignment.findOne({idUser: data.idUser});
        if(existsAssignments) return res.send({message: 'This user has already been assigned'});
        //guardar
        let assignment = new Assignment(data);
        await assignment.save();
        return res.send({message: 'Assignment saved sucessfully', assignment});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error creating assignment'});
    }
}

exports.getAssignments = async(req, res)=>{
    try{
        //buscar datos
        let assignments = await Assignment.find().populate('idUsuario').populate('idCursoUno').populate('idCUrsoDos').populate('idCursoTres');
        return res.send({message: 'Asignatura no encontrada', assignments});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al obtener asignaturas'});
    }
}