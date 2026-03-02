import mongoose from 'mongoose';
const recruiterProfile = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userRegister",
    required:true
  },
  companyName:{
    type:String,
    required:true
  },
  companyWebsite:{
    type:String,
    trim:true
  },
  companyDescription:{
    type:String,
    trim:true
  },
  location:{
    type:String,
    trim:true
  }
},{timestamps:true});
module.exports = mongoose.model("recruiterProfile",recruiterProfile);