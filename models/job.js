import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    skills: [
      {
         type: String,
          trim: true
         }],
    requirements: [{
       type: String,
        trim: true 
      }],

    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      required: true,
    },

    salary: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: "INR",
      },
    },
    experienceLevel: {
      type: String,
      enum: ["entry", "mid", "senior"],
      required: true,
    },

    experienceYears: {
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
      },
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Job", jobSchema);











// import mongoose from "mongoose";

// const jobSchema = new mongoose.Schema(
//   {
//     recruiter: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     company: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     location: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     skills: [{ type: String, trim: true }],
//     requirements: [{ type: String, trim: true }],
//     jobType: {
//       type: String,
//       enum: ["full-time", "part-time", "internship", "contract"],
//       required: true,
//     },
//     salary: {
//       min: { type: Number },
//       max: { type: Number },
//       currency: { type: String, default: "INR" },
//     },
//     experienceLevel: {
//       type: String,
//       enum: ["entry", "mid", "senior"],
//       required: true,
//     },
//     experienceYears: {
//       min: { type: Number, default: 0 },
//       max: { type: Number },
//     },
//     status: {
//       type: String,
//       enum: ["open", "closed"],
//       default: "open",
//     },
//     applicationsCount: { type: Number, default: 0 },
//     deadline: Date,
//   },
//   { timestamps: true },
// );

// // For text search
// jobSchema.index({ title: "text", description: "text", skills: "text" });

// export default mongoose.model("Job", jobSchema);
