import User from "../models/signup.js";
import jwt from "jsonwebtoken";


//signup
const userSignup = async (req, res) => {
  try {
    let { fullName, email, password, role } = req.body;
    const emailExist = await User.findOne({
      email: email.trim().toLowerCase(),
    });
    if (emailExist) {
      return res.status(401).json({
        success: false,
        message:
          "Email already registered. Please use a different email or login.",
      });
    }
    const user = new User({
      fullName,
      email,
      password,
      role,
    });
    await user.save();

    // creating jwt token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    //set token
    res.cookie("Token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000
    });
   return res.status(201).json({
      success: true,
      role: role,
      token: token,
    });
  } catch (err) {
    console.log("signup page error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


//login

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userEmail = await User.findOne({ email: email.trim().toLowerCase() });

    
    const userPassword = await userEmail.passwordCompare(password);

    if (!userEmail || !userPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign(
      {
        id: userEmail._id,
        role: userEmail.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("Token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000,
    });
  return res.status(200).json({
    success: true,
    role: userEmail.role,
  });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export { userSignup, userLogin };
