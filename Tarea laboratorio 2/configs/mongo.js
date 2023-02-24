'use strict'
require('dotenv').config()
const mongoose = require('mongoose');

exports.connect = async()=>{
    try{
        const uriMongo = `${process.env.URI_MONGO}`;
        mongoose.set('strictQuery', false);
        await mongoose.connect(uriMongo);
        console.log('Connectado a la base de datos');
    }catch(err){
        console.error(err)
    }
}