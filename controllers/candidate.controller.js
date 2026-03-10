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
    if (skills){ 
      skills = skills.split(",").map((s) => s.trim().toLowerCase())

    };
    let { startYear="", endYear="", collegeName="", branch="" } = education;
   
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
const updatedProfile = await candidate.findOneAndUpdate(
  { user: id },
  {
    $set: {
      aboutMe,
      education: { collegeName, startYear, endYear, branch },
      skills: skills ? [...new Set(skills)] : [],
      profileImage: profileImageUrl,
      resume: resumeUrl,
    },
    $push: { experience: { $each: experience } },
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
    // Get logged-in user id
    const id = req.user?.id;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { aboutMe, education, skills, experience } = req.body;
    const profileImage = req.files?.profileImage?.[0];
    const resume = req.files?.resume?.[0];

    const updateData = {};

    //  About Me
    if (aboutMe !== undefined) {
      updateData.aboutMe = aboutMe;
    }

    // Skills
    if (skills !== undefined) {
      const newSkills = skills.split(",").map((skill) => skill.trim().toLowerCase());

      const existingProfile = await candidate.findOne({ user: id });
      const existingSkills = existingProfile?.skills || [];

      // merge old + new skills and remove duplicates
      updateData.skills = [...new Set([...existingSkills, ...newSkills])];
    }

    //  Education
    if (education !== undefined) {
      try {
        const parsedEducation = JSON.parse(education);
        updateData.education = parsedEducation;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid education format",
        });
      }
    }

    let newExperience = [];
    if (experience !== undefined) {
      try {
        const parsed = JSON.parse(experience);
        newExperience = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return res.status(400).json({ success: false, message: "Invalid experience format" });
      }
    }


    //  Profile Image
    if (profileImage) {
      updateData.profileImage = await uploadToImageKit(
        profileImage.path,
        "jobportal/candidate/profileImages",
      );
      }

    // Resume
    if (resume) {
      updateData.resume = await uploadToImageKit(
        resume.path.replace(/\\/g, "/"),
        "jobportal/candidate/resumes",
      );
    }

    //Update or create profile
    const updatedProfile = await candidate.findOneAndUpdate(
      { user: id },
      { $set: updateData,
        ...(newExperience.length>0 && {$push:{experience:{$each:newExperience}}})
       },
      { new: true, upsert: true },
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
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
