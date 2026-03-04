import express from "express";
import cookieParser from "cookie-parser";
import candiateProfile from "../models/candiateProfile.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

const app = express();
app.use(cookieParser());

const updateCandidateProfile = async (req, res) => {
  try {
    const { aboutMe, education, skills, experience } = req.body;
    const { profileImage, resume } = req.files;
    const id = req.user?.id; //getting data from middleware

    const educationObj = {
      collegeName: education?.collegeName,
      startYear: education?.startYear,
      endYear: education?.endYear,
      branch: education?.branch,
      cgpa: education?.cgpa,
    };

    //to handle multiple experience
    const experiences =
      experience
        ?.map((exp) => ({
          companyName: exp?.companyName,
          position: exp?.position,
          startDate: exp?.startDate,
          endDate: exp?.endDate,
          description: exp?.description,
        }))
        .filter((exp) => exp.companyName || exp.position) || [];

    //Adding skills
    let skillsArray = [];
    if (skills) {
      skillsArray = Array.isArray(skills) ? skills : skills.split(",");
    }
    skillsArray = skillsArray.map((s) => s.trim().toLowerCase()); // converting to lower case
    skillsArray = skillsArray.filter((s) => s.length > 0); // removing white space
    skillsArray = [...new Set(skillsArray)]; // remove duplicates

    // uploading profile img and resume to cloudinary
    let profileImageUrl, resumeUrl;

   
    // Upload profile image if exists
    if (profileImage?.[0]) {
      profileImageUrl = await uploadToCloudinary(
        profileImage[0].path,
        "jobportal/profileImages",
        "image",
      );
      
    } else {
      console.log("No profile image uploaded");
    }
    // Upload resume if exists
    if (resume?.[0]) {
      resumeUrl = await uploadToCloudinary(
        resume[0].path,
        "jobportal/resumes",
        "raw",
      );
      
    } else {
      console.log("No resume uploaded");
    }
    const updateUser = await candiateProfile.findOneAndUpdate(
      { user: id },
      {
        aboutMe,
        education: educationObj,
        skills: skillsArray,
        experience: experiences,
        profileImage: profileImageUrl,
        resume: resumeUrl,
      },
      { new: true, upsert: true }, // it will update the document
    );
    await updateUser.save();

    console.log(id);
    return res.status(201).json({
      success: true,
      message: "profile updated successfully",
    });
  } catch (err) {
    console.log("error at profile");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export { updateCandidateProfile };

