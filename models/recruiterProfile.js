import mongoose from "mongoose";

const recruiterProfile = mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyWebsite: {
      type: String,
      trim: true,
    },
    companyDescription: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    recruiterProfileImage: String,
    companyLogo: String
  },
  { timestamps: true },
);
export default mongoose.model("recruiter", recruiterProfile);
