import mongoose,{Schema} from "mongoose";

const profile = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userRegister",   // Link to User model
    required: true,
  },
    profileImage :{
        type:String,
        trim:true
    },
    education:{
        type:String,
        trim:true
    },
    Skills:[{
        type:String,
        trim:true
    }],
    experience:{
        type:String,
        trim:true
    },
    resume:{
        type:String     
    },
     profileCompletion: {
    type: Number,
    default: 0,            // Percentage (0–100)
  }


},{timestamps:true});

export default mongoose.model("userProfile",profile);

