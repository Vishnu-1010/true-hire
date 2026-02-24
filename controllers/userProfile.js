import express from "express";
const app = express();
import cookieParser from "cookie-parser";
app.use(cookieParser());

import profile from "../models/profile.js";
// post update profile
const updateProfile = async (req, res) => {
  try {
    const { aboutMe, education, skills, experience } = req.body;
    // destructuring college details
    const educationObj = {
      collegeName: education?.collegeName,
      branch: education?.branch,
      cgpa: education?.cgpa,
    };
    // skills array
    const skillsArray = [];
    if (skills) {
      skillsArray = Array.isArray(skills)
        ? skills
        : skills.split(",").map((s) => s.trim());
    }
    let profileurl = null;
    let removeurl = null;
    const id = req.cookies._id;
    const userProfileUpdate = await profile
      .findByIdAndUpdate(
        { user:id},
        {
           aboutMe,
          education: educationObj,
          skills: skillsArray,
           experience,
        },
        { new: true, upsert: true }, // return updated doc, create if not exists
      )
      .populate("user", "fullName,email");

    res.status(201).json({
      success: true,
      message: "profile successfully updated",
    });
  } catch (err) {
    res.status(501).json({
      success: false,
      message: "Internal server error while creating profile",
    });
  }
};

export { updateProfile };
