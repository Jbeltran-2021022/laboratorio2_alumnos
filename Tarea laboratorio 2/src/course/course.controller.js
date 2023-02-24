'use strict'

const Course = require('./course.model');

exports.test = (req,res)=>{
    res.send({message: 'funcion de prueba esta corriendo'});
}

exports.defaultCourse = async()=>{
    try{
        let data = {
            name: 'Desasignado',
            description: 'Desasignado'
        }
        let existCourse = await Course.findOne({name: 'Desasignado'});
        if(existCourse) return console.log('Curso por defecto fue creado');
        let defCourse = new Course(data);
        await defCourse.save();
        return console.log('Curso por defecto creado');
    }catch(err){
        return console.error(err);
    }
}


exports.addCourse = async(req,res)=>{
    try{
        let data = req.body;
       
        let existsCourse = await Course.findOne({name: data.name});
        if(existsCourse){
            return res.send({message: 'curso ya a sido creado'});
        }
        let course = new Course(data);
        await course.save();
        return res.status(201).send({message: 'curso creado'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al guardar curso'});
    }
}


exports.getCourses = async(req, res)=>{
    try{
        let courses = await Course.find();
        return res.send({message: 'Curso encontrado', courses})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al obtener cursos'});
    }
}


exports.updateCourse = async(req, res)=>{
    try{
       
        let courseId = req.params.id;
        
        let data = req.body;
      
        let updatedCourse = await Course.findOneAndUpdate(
            {_id: courseId},
            data,
            {new: true}
        )
        if(!updatedCourse) return res.send({message: 'Curso no pudo ser creado ni actualizado'});
        return res.send({message:'Course updated', updatedCourse});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error actualizando cursos'});
    }
}


exports.deleteCourse =async(req,res)=>{
    try{
      
        let courseId = req.params.id;
        
        let defaultCourse = await Course.findOne({name: 'Desasignado'});
        if(defaultCourse._id == courseId) return res.send({message: 'Curso por defecto no puede ser creado'});
        await Course.updateMany({course: courseId}, {course: defaultCourse._id});
       
        let deletedCourse = await Course.findOneAndDelete({_id: courseId});
        if(!deletedCourse) return res.status(404).send({message: 'Curso no encontrado y no se puede eliminar'});
        return res.send({message: 'Curso eliminado con exito'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al eliminar curso'});
    }
}