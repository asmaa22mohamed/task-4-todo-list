const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    
        username: {
         type:String, 
        required:true,
        unique:true
          },
        password : {
            type:String, 
            required:true
        },
        firstName:{
            type:String, 
            minlength:3,
           maxlength:15
        } ,

        age: {
            type:Number,
            required:false,
             min: 13
            }
        
        
  });

 module.exports= mongoose.model(' User',personSchema);

  