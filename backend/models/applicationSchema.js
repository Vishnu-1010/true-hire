import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },
    resume: {
      type: String,
      trim: true,
      required: true,
    },
    coverLetter: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["applied", "In-review", "shortlisted", "rejected", "hired"],
      default: "applied",
    },
    gitHubLink: {
      type: String,
      trim: true,
    },
    portfolioLink: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

applicationSchema.index({ applicant: 1, job: 1 }, { unique: true });

export default mongoose.model("Application",applicationSchema);