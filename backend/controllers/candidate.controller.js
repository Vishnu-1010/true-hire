import candidate from "../models/candiateProfile.js";
import uploadToImageKit from "../utils/imagekitUpload.js";

const createCandidate = async (req, res) => {
  try {
    const id = req.user?.id;
    if (!id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
    let { aboutMe, education, skills, experience } = req.body;
    const profileImage = req.files?.profileImage?.[0];
    const resume = req.files?.resume?.[0];

    try {
      experience = experience ? JSON.parse(experience) : [];
      if (!Array.isArray(experience)) experience = [experience];
    } catch {
      return res.status(400).json({ message: "Invalid experience format" });
    }
    try {
      education = education ? JSON.parse(education) : {};
    } catch {
      return res.status(400).json({ message: "Invalid education format" });
    }

  

    if (skills) {
      skills = skills.split(",").map((s) => s.trim().toLowerCase());
    }
    let {
      startYear = null,
      endYear = null,
      collegeName = "",
      branch = "",
    } = education || {};

    // uploading profile img and resume to cloudinary
    let profileImageUrl, resumeUrl;

    if (profileImage) {
      profileImageUrl = await uploadToImageKit(
        profileImage.path,
        "jobportal/candidate/profileImages",
      );
    }

    if (resume) {
      resumeUrl = await uploadToImageKit(
        resume.path.replace(/\\/g, "/"),
        "jobportal/candidate/resumes",
      );
    }

    const createProfile = await candidate.findOneAndUpdate(
      { user: id },
      {
        $set: {
          user: id,
          aboutMe,
          education: { collegeName, startYear, endYear, branch },
          skills,
          experience,
          profileImage: profileImageUrl,
          resume: resumeUrl,
        },
      },
      { new: true, upsert: true },
    );

    return res.status(201).json({
      success: true,
      message: "profile updated successfully",
    });
  } catch (err) {
    console.error("Error at candidate profile:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};




//  get candidate profile
const getCandidate = async (req, res) => {
  try {
    const id = req.user?.id;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }
    let getUser = await candidate.findOne({ user: id }).populate("user","fullName email role").lean();
    if(!getUser){
      return res.status(404).json({
        success:false,
        message:"candidate profile dosen't exist"
      })
    }
    return res.status(200).json({
      success: true,
      data: getUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateCandidate = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { aboutMe, education, skills, experience } = req.body;
    const profileImage = req.files?.profileImage?.[0];
    const resume = req.files?.resume?.[0];

    const updateData = {
      user: userId, 
    };


    if (aboutMe) {
      updateData.aboutMe = aboutMe;
    }

    
    if (skills) {
      updateData.skills = skills
        .split(",")
        .map((skill) => skill.trim().toLowerCase());
    }

    if (education) {
      try {
        updateData.education = JSON.parse(education);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid education format",
        });
      }
    }

   
    if (experience) {
      try {
        const parsed = JSON.parse(experience);
        updateData.experience = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid experience format",
        });
      }
    }

    // Profile Image Upload
    if (profileImage) {
      updateData.profileImage = await uploadToImageKit(
        profileImage.path,
        "jobportal/candidate/profileImages",
      );
    }

    // Resume Upload
    if (resume) {
      updateData.resume = await uploadToImageKit(
        resume.path.replace(/\\/g, "/"),
        "jobportal/candidate/resumes",
      );
    }

    //  Update Profile
    const updatedProfile = await candidate.findOneAndUpdate(
      { user: userId },
      { $set: updateData },
      { new: true, upsert: true },
    );

    return res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export { createCandidate, getCandidate, updateCandidate };
