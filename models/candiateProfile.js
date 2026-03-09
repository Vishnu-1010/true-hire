import mongoose, { Schema } from "mongoose";

const candidateProfile = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Link to User model
      required: true,
      unique: true,
    },
    aboutMe: {
      type: String,
      trim: true,
    },
    education: {
      collegeName: { type: String, trim: true },
      startYear: {
        type: Number,
      },
      endYear: {
        type: Number,
      },
      branch: { type: String, trim: true },
    },
    skills: [
      {
        type: String,
        trim: true,
        lowercase: true,
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

export default mongoose.model("candidate", candidateProfile);
