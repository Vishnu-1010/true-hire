import mongoose from "mongoose";

const candidateProfile = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Link to User model
      required: true,
      unique: true,
    },
    aboutMe: {
      type: String,
      trim: true,
    },
    education: {
      collegeName: {
         type: String,
          trim: true,
           required: true 
          },
      degree:{
        type:String,
        trim:true
      },
      branch: { type: String, trim: true },
      startYear: {
        type: Number,
      },
      endYear: {
        type: Number,
      },
    },
    skills: [
      {
        type: String,
        trim: true,
        lowercase: true,
        index:true
      },
    ],
    experience: [
      {
        companyName: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    profileImage: String,
    resume: String,
  },
  { timestamps: true },
);

export default mongoose.model("Candidate", candidateProfile);
