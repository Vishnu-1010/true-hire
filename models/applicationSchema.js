import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
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
      enum: ["Applied", "In-review", "shortlisted", "rejected", "hired"],
      default: "Applied",
    },
  },
  { timestamps: true },
);

applicationSchema.index({ applicant: 1, job: 1 }, { unique: true });

module.exports = mongoose.model("Application",applicationSchema);