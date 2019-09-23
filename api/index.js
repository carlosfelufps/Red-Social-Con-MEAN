'use strict'

var mongoose = require('mongoose');
var app= require('./app');//exporto app
var port =3800; 


//Conexion a BD
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/red-social',{useMongoClient: true})
        .then(()=>{
      console.log("La conexion a la bd se ha realizado correctamente");
  
      //crear servidor
      app.listen(port,()=>{
        console.log("Servidor corriendo en http://localhost:3800");
      })

    })
        .catch(err => console.log(err));

