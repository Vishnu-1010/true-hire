import User from "../models/signup.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// home
const homePage = (req, res) => {
  res.send("home");
};

//signup
const userSignup = async (req, res) => {
  try {
    let { fullName, email, password, role } = req.body;
    const emailExist = await User.findOne({
      email: email.trim().toLowerCase(),
    });
    if (emailExist) {
      return res.status(409).json({
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
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("Token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.status(201).redirect("/profile");
  } catch (err) {
    console.log("signup page error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
//login

const userProfile = (req, res) => {
  res.send("profile");
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userEmail = await User.findOne({ email: email.trim().toLowerCase() });

    if (!userEmail) {
      return res.status(404).json({ msg: `user doesn't exist` });
    }
    const userPassword = await userEmail.passwordCompare(password);

    if (!userPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
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
      secure: true,
      sameSite: "Strict",
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: userEmail._id,
        fullName: userEmail.fullName,
        role: userEmail.role,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export { userSignup, userLogin, userProfile, homePage };
