const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
userId:{
    type:String
},
title:{
    type:String,
     required:true,
      minlength :10, 
      maxlength: 20
}, 
body: {
    type:String,
     required:true,
      minlength :10, 
      maxlength :500
    },
tags:[{
      type:String,
     required:false,
      maxlength : 10
    }],
createdAt: {
     type: Date,
     default: Date.now 
    },

updatedAt: { 
    type: Date,
     default: Date.now
     }

});
module.exports= mongoose.model('Todo',todoSchema);