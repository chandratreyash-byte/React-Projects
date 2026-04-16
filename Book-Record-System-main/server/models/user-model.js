const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum: ["admin", "user"],default:"user"}
})

const User = new mongoose.model('user',userSchema);

module.exports=User;