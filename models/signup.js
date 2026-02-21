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
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
  },
  { timeseries: true },
);
userSchema.pre("save", async function (next) {
  // encrypting password before saving to database
  if (!this.isModified("password")) {
    return next();
  } else {
    const salt = bcrypt.genSaltSync(process.env.SALT_ROUNDS || 12);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
  }
});

// password comparison method
userSchema.methods.passwordCompare = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

export default mongoose.model("userRegister", userSchema);
