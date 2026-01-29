import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["candidate", "employer", "admin"],
      default: "Candidate",
    },
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
   
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    },
  { timeseries: true },
);

export default mongoose.model("userRegister", userSchema);
