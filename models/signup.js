import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["candidate", "recruiter"],
      default: "candidate",
    },
  },
  { timestamps: true },
);
userSchema.pre("save", async function (next) {
  // encrypting password before saving to database
  if (!this.isModified("password")) {
    return next();
  } else {
   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(this.password, salt);
   this.password = hash;
   next();
  }
});

// password comparison method
userSchema.methods.passwordCompare = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

export default mongoose.model("User", userSchema);
