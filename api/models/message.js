'use strict'
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = Schema({
  
   text:String,
   viewed: String,
   created_at:String,
   emmiter: {
      type: Schema.ObjectId, ref: 'User' 
   },//emisor
   receiver: {
    type: Schema.ObjectId, ref: 'User'
   }//receptor
 
});

module.exports = mongoose.model('Message', MessageSchema);