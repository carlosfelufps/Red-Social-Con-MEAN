'use strict'
var bcrypt = require('bcrypt-nodejs');


//primera en mayuscula para saber que es un modelo
var User = require('../models/user');
var jwt=require('../services/jwt');


function home(req, res){
    console.log(req.body);
    res.status(200).send({
        message: 'Hola Inicio' 
    })
};


function pruebas(req, res){
    res.status(200).send({
        message: 'Hola desde Prueba' 
    })
};

function saveUser(req,res){
  
    var params = req.body;
    //creo el usuario que voy a guardar
    var user= new User();
    if(params.name&&params.surname&& params.nick&&params.email&&params.password){
        //asigno los datos del request al modelo..
        user.name=params.name;
        user.surname=params.surname;
        user.nick=params.nick;
        user.email=params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        //controlar usuarios duplicados
        User.find({ $or: [
                {email: user.email.toLowerCase()},
                {nick: user.nick.toLowerCase()}
        ]}).exec((err, users)=>{
            if(err){
                return res.status(500).send({message: 'Error en la peticion de usuarios'});
            }
            if(users && users.length >=1){
                return res.status(200).send({message: 'El Usuario ya existe'});
            }else{
            //Crifro la password
            bcrypt.hash(params.password, null, null,(err, hash) =>{
            user.password=hash;
            
            user.save((err, userStored) =>{ //guardo el usuario con mongoose
                if(err) return res.status(500).send({message: 'Error al Guardar el usuario'});
                if(userStored){
                    res.status(200).send({user: userStored});//devuelvo un json con el usuario que guarde en la BD
                }else{
                    res.status(404).send({message: 'No se ha registrado el usuario'});
                }
            });
        });
            }
        });
    }else{
        res.status(200).send({
            message: 'Es necesario llenar todos los campos'
        });
    }
}
function loginUser(req, res){
  var params=req.body;

  var email=params.email;
  var password=params.password;

  User.findOne({email: email}, (err, user)=>{
      if(err) return res.status(500).send({message: 'Error en la peticion'});

      if(user){
          bcrypt.compare(password, user.password, (err, check)=>{//comparo la del POST con la encriptada
            if(check){
                 user.password=undefined;//elimino la contraseña de los datos que retorno
                 //devolver datos de usuario
                 if(params.gettoken){
                      //generar y devolver token
                      return res.status(200).send({
                          token: jwt.createToken(user)
                      });

                 }else{
                    return res.status(200).send({user});
                 }
            }else{
                  res.status(404).send({message:'El usuario no se ha podido identificar'});
            }
          });
      }else{
        res.status(404).send({message:'El usuario no se ha podido identificar'});
      }
  });
}
module.exports={
    home,
    pruebas,
    saveUser,
    loginUser
}
