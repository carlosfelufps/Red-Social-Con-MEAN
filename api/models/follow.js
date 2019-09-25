'use strict'
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var FollowSchema = Schema({
  
   user: {
      type: Schema.ObjectId, ref: 'User' 
   },//seguidor
   followed: {
    type: Schema.ObjectId, ref: 'User'
 }//seguido

});

module.exports = mongoose.model('Follow', FollowSchema);