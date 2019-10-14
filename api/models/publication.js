'use strict'
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var PublicationSchema = Schema({
   text: String,
   file : String,
   created_at: String,
   user: {
      type: Schema.ObjectId, ref: 'User' //los datos se sustituyen por los datos del user que creo la publicacion
   }
});

module.exports = mongoose.model('Publication', PublicationSchema);