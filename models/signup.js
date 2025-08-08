const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        immutable:true,
        trim:true,
    },
    password:{
        type:String,
        require:true,

    },
    role:{
        type:String,
        require:true,
        enum:['candidate','employer'],
        
    }
})