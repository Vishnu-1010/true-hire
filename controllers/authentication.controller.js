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

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }, // temporary
    );

    //set token
    res.cookie("Token", token, {
      httpOnly: true,
      secure: true,
      sameSite: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
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

    if (!userEmail) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const userPassword = await userEmail.passwordCompare(password);

    if (!userPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
if (userEmail.status === "banned") {
  return res.status(403).json({
    success: false,
    message: "Your account is banned",
  });
}
    const token = jwt.sign(
      {
        id: userEmail._id,
        role: userEmail.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }, // temporary
    );

    res.cookie("Token", token, {
      httpOnly: true,
      secure: true,
      sameSite: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      token: token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
const logout = async (req, res) => {
  const token = req.cookies.Token;

  // find user by refresh token
  const user = await User.findOne({ refreshToken: token });

  // clear cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  return res.json({ message: "Logged out" });
};

export { userSignup, userLogin, logout };
