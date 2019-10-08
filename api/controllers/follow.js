'use strict'

//var path = require(path);
//var fs=require('fs');
var mongoosePaginate = require('mongoose-pagination');

var User = require('../models/user');
var Follow = require('../models/follow');

function saveFollow(req, res){
    var params = req.body;
    var follow = new Follow();
    follow.user =  req.user.sub; // seguidor
    follow.followed = params.followed // seguido

    follow.save((err,followStored) => {
        if(err) return res.status(500).send({message : 'Error al guardar el seguimiento'});
        if(!followStored){
            return res.status(404).send({message : 'El seguimiento no se ha guardado'});
        }
        return res.status(200).send({follow : followStored});
    });
}

function deleteFollow(req, res){
        var userId = req.user.sub;
        var followId = req.params.id;

        Follow.find({'user':userId, 'followed':followId}).remove(err =>{
            if(err) return res.status(500).send({message : 'Error al dejar de seguir'});

            return res.status(200).send({message:'Follow eliminado correctamente'});
        });
}

//listar los usuarios que esta siguiendo determinado usuario
function getFollowingUsers(req, res){
    var userId = req.user.sub;
    if(req.params.id&&req.params.page){
        userId=req.params.id;
    }

    var page=1;

    if(req.params.page){
        page=req.params.page;
    }else if(req.params.id){
        page=req.params.id; 
    }

    var itemsPerPage = 4 ;

    Follow.find({user:userId}).populate('followed').paginate(page,itemsPerPage,(err, follows, total)=>{//el populate es para mostrar la informacion interna de el usuario seguido, en vez de mostrar el id solamente
        console.log(page);
        if(err) return res.status(500).send({message : 'Error en el servidor'});
        if(!follows) return res.status(404).send({message: 'No estas siguiendo a ningun usuario'});
        return res.status(200).send({
            total : total,
            pages: Math.ceil(total/itemsPerPage),
            follows
        });
    });
}
//listar los usuarios que siguen a determinado usuario
function getFollowersUsers(req, res){
var userId = req.user.sub;
    if(req.params.id&&req.params.page){
        userId=req.params.id;
    }s
    var page=1;
    if(req.params.page){
        page=req.params.page;
    }else if(req.params.id){
        page=req.params.id; 
    }
    var itemsPerPage = 4 ;
    Follow.find({followed:userId}).populate('user').paginate(page,itemsPerPage,(err, follows, total)=>{//el populate es para mostrar la informacion interna de el usuario, en vez de mostrar el id solamente
        if(err) return res.status(500).send({message : 'Error en el servidor'});
        if(!follows) return res.status(404).send({message: 'No te sigue ningun usuario'});
        return res.status(200).send({
            total : total,
            pages: Math.ceil(total/itemsPerPage),
            follows
        });
    });
}

module.exports={
     saveFollow,
     deleteFollow,
     getFollowingUsers,
     getFollowersUsers
}