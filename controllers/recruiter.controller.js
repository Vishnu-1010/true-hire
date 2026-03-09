import recruiter from "../models/recruiterProfile.js"
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

const createRecruiter = async (req, res) => {
try {
  const { companyName , companyWebsite , companyDescription, location } = req.body;
  const { recruiterImage, companyLogos } = req.files || {};
  const id = req.user?.id;
  if(!id){
    return res.status(401).json({
      success:false,
      message:"unauthorized"
    })
  }

  if (!companyName || !companyWebsite) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Company name and website are required",
      });
  }
  
  // Upload profile image if exists
 
  const recruiterProfileUrl = recruiterImage?.[0]
    ? await uploadToCloudinary(
        recruiterImage[0].path,
        "jobportal/recruiter/recruiterImage",
        "image",
      )
    : null;

  const companyLogoUrl = companyLogos?.[0]
    ? await uploadToCloudinary(
        companyLogos[0].path,
        "jobportal/recruiter/companyLogo",
        "image",
      )
    : null;

  
const updateData = { companyName, companyWebsite, companyDescription, location};

if (recruiterProfileUrl) updateData.recruiterProfileImage = recruiterProfileUrl;
if (companyLogoUrl) updateData.companyLogo = companyLogoUrl;
  
  const profile = await recruiter.findOneAndUpdate(
    { recruiter: id },
    updateData,
    { new: true, upsert: true },
  );

  return res.status(201).json({
    success: true,
    message: "successfully created recruiter profile",
  });
} catch (err) {
  return res.status(500).json({
    success:false,
    message:"Internal server error"
  })
}

};
// get recruiter profile
const getRecruiter= async(req,res) =>{
try {
  const id = req.user?.id;
   if (!id) {
     return res.status(401).json({
       success: true,
       message: "unauthorized",
     });
   }
  const getRecruiter = await recruiter
    .findOne({ recruiter: id })
    .populate("recruiter","fullName email role");
  if(!getRecruiter)
  {
    
    return res.status(404).json({
      success:false,
      message:"user does't exist"
    })
  }

  return res.status(200).json({
    success:true,
    data:getRecruiter
  })
} catch (err) {
  return res.status(500).json({
    success:false,
    message:err.message
  })
}
}

//upadate recruiter profile
 
const updateRecruiter = async (req, res) => {
  try {
    const id = req.user?.id; 
    if (!id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { companyName, companyWebsite, companyDescription, location } =  req.body || {};

    // Build update object only with provided fields
    const updateData = {};
    if (companyName) updateData.companyName = companyName;
    if (companyWebsite) updateData.companyWebsite = companyWebsite;
    if (companyDescription) updateData.companyDescription = companyDescription;
    if (location) updateData.location = location;

    // update images if files are sent
    const { recruiterImage, companyLogos } = req.files || {};
    if (recruiterImage?.[0]) {
      updateData.recruiterProfileImage = await uploadToCloudinary(
        recruiterImage[0].path,
        "jobportal/recruiter/recruiterImage",
        "image",
      );
    }
    if (companyLogos?.[0]) {
      updateData.companyLogo = await uploadToCloudinary(
        companyLogos[0].path,
        "jobportal/recruiter/companyLogo",
        "image",
      );
    }

    // Update recruiter profile
    const updatedProfile = await recruiter.findOneAndUpdate(
      { recruiter: id },
      { $set: updateData },
      { new: true },
    );

    if (!updatedProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Recruiter profile not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (err) {
    console.error("updateRecruiter error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export {createRecruiter,getRecruiter,updateRecruiter};