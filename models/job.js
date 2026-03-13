import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: [{
      type: String,
      required: true,
      trim: true,
      index: true,
    }],
    skills: [
      {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
      },
    ],
    requirements: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

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
      minYear: {
        type: Number,
        default: 0,
      },
      maxYear: {
        type: Number,
      },
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    applicationsCount: { type: Number, default: 0 },
    deadline: {
      type: Date,
      default: () => {
        const now = new Date();
        now.setDate(now.getDate() + 7); // +7 days
        return now;
      },
    },
  },
  { timestamps: true },
);

// inside Job schema file
jobSchema.virtual("applications", {
  ref: "Application",   // model name
  localField: "_id",    // Job _id
  foreignField: "job",  // Application.job points here
  justOne: false
});

// enable virtuals in JSON output
jobSchema.set("toJSON", { virtuals: true });
jobSchema.set("toObject", { virtuals: true });


export default mongoose.model("Job", jobSchema);










