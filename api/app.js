'use strict'
var express = require('express');
var bodyParser = require('body-parser');
 

//instancia de express
var app = express();

//cargar rutas


// middlewares (metodo que se ejecuta antes de que llegue a un controlador)
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());//convierto a json

//cors


//rutas
app.post('/inicio',(req, res)=>{
    console.log(req.body);
    res.status(200).send({
        message: 'Hola Inicio' 
    })
});


app.get('/hola',(req, res)=>{
    res.status(200).send({
        message: 'Hola Mundo desde Nodejs' 
    })
});
//exportar
module.exports =app;