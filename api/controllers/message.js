'use strict'

var momment = require('momment');
var mongoosePaginate= require('mongoose-pagination');

var User = require('../models/user');
var Follow = require('../models/follow');
var Message = require('../models/message');

function save_message(req, res){
    var params=req.body;

    if(!params.text||!params.receiver){
        return res.status(200).send({message: 'Envia los campos necesarios'});
    }else{
        var message= new Message();
        message.emitter= req.user.sub;
        message.receiver=params.receiver;
        message.text=params.text;
        message.created_at=momment().unix();

        message.save((err,messageStored)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion'});
            if(!messageStored){
                return res.status(500).send({message: 'Error al enviar el mensaje'});
            }else{
                return res.status(200).send({message: messageStored});
            }
        });

    }
}

function getReceivedMessages(req, res){

    var userId= req.user.sub;

    var page=1;

    if(req.params.page){
       page=req.params.page;
    }

     var itemsPerPage=4;

     //segundo parametro del populate para que solo me muestre esos campos
     Message.find({receiver:userId}).populate('emmiter', 'name surname _id nick image').paginate(page, itemsPerPage, (err, messages, total)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'}); 
        if(!messages){
            return res.status(404).send({message: 'No te han enviado mensajes'});
          }else{
            return res.status(500).send({
                total_items:total,
                pages: Math.ceil(total/itemsPerPage),
                page:page,
                messages
            });
          }
     });
}
module.exports={
     save_message,
     getReceivedMessages
}