'use strict'
const User = require('./user.model');
const { validateData, encrypt, checkPassword } = require('../utils/validate');
const {createToken} = require('../services/jwt')

exports.test = (req,res)=>{
    res.send({message: 'funcion de prueba corriendo exitosamente'});
}


exports.register = async(req, res)=>{
    try{
       
        let data = req.body;
        
        let existsUser = await User.findOne({email: data.email}); 
        if(existsUser){
            return res.send({message: 'curso ya a sido creado'});
        }
        let params ={
            name: data.name,
            surname: data.surname,
            code: data.code,
            grade: data.grade,
            email: data.email,
            password: data.password
        }
        let validate = validateData(params);
        if(validate) return res.status(400).send(validate);
      
        data.role = 'ALUMNO'
       
        data.password = await encrypt(data.password);
       
        let user = new User(data);
        await user.save();
        return res.send({message: 'Cuenta creada'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error no se pudo crear cuenta', error: err.message})
    }
}


exports.save = async(req, res)=>{
    try{
        
        let data = req.body;
       
        let existsUser = await User.findOne({email: data.email});
        if(existsUser){
            return res.send({message: 'el usuario ya existe'});
        }
        let params ={
            name: data.name,
            surname: data.surname,
            titulos: data.titulos,
            email: data.email,
            password: data.password,
            role: data.role
        }
        let validate = validateData(params);
        if(validate) return res.status(400).send(validate);
        data.password = await encrypt(data.password);
        let user = new User(data);
        await user.save();
        return res.send({message: 'cuenta ha sido creada con exito'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al guardar el usuario '})
    }
}


exports.login = async(req,res)=>{
    try{
      
        let data = req.body;
        let cretentials ={
            email: data.email,
            password: data.password
        }
        let msg = validateData(cretentials);
        if(msg) return res.status(400).send(msg);
        
        let user = await User.findOne({email: data.email});
       
        if(user && await checkPassword(data.password, user.password)){
            let token = await createToken(user);
           
            return res.send({message: 'Usuario inicio correctamente', token});
        } 
        return res.status(401).send({message: 'error de credenciales no validas'});
        
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error no fue registradoS'});
    }
}


exports.update = async(req, res)=>{
  try{

      let userId = req.params.id;
    
      let data = req.body;
  
      if(userId != req.user.sub) return res.status(401).send({message: 'Error no tienes permisos suficientes'});
      
      if(data.password || Object.entries(data).length === 0 || data.role) return res.status(400).send({message: 'se han enviado algunos datos que no se pueden actualizar'});
      let userUpdated = await User.findOneAndUpdate(
          {_id: req.user.sub},
          data,
          {new: true} 
      )
      if(!userUpdated) return res.status(404).send({message: 'Error usuario no encontrado '});
      return res.send({message: 'Usuario fue actualizado con exito', userUpdated})
  }catch(err){
      console.error(err);
      return res.status(500).send({message: 'Error usuario no ha sido actualizado', err: `Email ${err.keyValue.email} ya ha sido registrado`});
  }
}



exports.delete = async(req, res)=>{
  try{
   
      let userId = req.params.id;
   
      if( userId != req.user.sub) return res.status(401).send({message: 'Error no tienes suficiente permisos'});

      let userDeleted = await User.findOneAndDelete({_id: req.user.sub});
      if(!userDeleted) return res.send({message: 'Error cuenta no fue encontrada '});
      return res.send({message: `Cuenta y email ${userDeleted.email}ha sido eliminada correctamente`});
  }catch(err){
      console.error(err);
      return res.status(500).send({message: 'Error no pudo ser eliminada'});
  }
}