// models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userRegister",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      required: true,
    },

    salary: {
      type: Number,
    },

    description: {
      type: String,
      required: true,
    },

    requirements: [
      {
        type: String,
        trim: true,
      },
    ],

    experienceLevel: {
      type: String,
      enum: ["fresher", "junior", "mid", "senior"],
    },

    deadline: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("jobSchema", jobSchema);
