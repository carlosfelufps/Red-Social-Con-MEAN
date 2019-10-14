'use strict'
var express = require('express');
var bodyParser = require('body-parser');
 

//instancia de express
var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var follow_routes = require('./routes/follow');
var publication_routes= require('./routes/publication');

// middlewares (metodo que se ejecuta antes de que llegue a un controlador)
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());//convierto a json

//cors

//rutas
app.use('/api',user_routes);//middleware
app.use('/api',follow_routes);
app.use('/api',publication_routes);

//exportar
module.exports =app;