import recruiterProfile from "../models/recruiterProfile.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

const updateRecruiterProfile = async (req, res) => {
try {
  const { companyName, companyWebsite, companyDescription, location } =
    req.body;
  const { recruiterProfileImage, companyLogo } = req.files;
  const id = req.user.id;
  let recruiterProfileUrl,companyLogoUrl;
  
  // Upload profile image if exists
  if (recruiterProfileImage?.[0]) {
   recruiterProfileUrl = await uploadToCloudinary(
      recruiterProfileImage[0].path,
      "jobportal/recruiterImage",
      "image",
    );
   
  } else {
    console.log("No profile image uploaded");
  }
   if (companyLogo?.[0]) {
   companyLogoUrl = await uploadToCloudinary(
     companyLogo[0].path,
     "jobportal/companyLogo",
     "image",
   );
  
  } else {
    console.log("No profile image uploaded");
  }
  const profile = await recruiterProfile.findOneAndUpdate(
    { user: id },
    {
      companyName,
      companyWebsite,
      companyDescription,
      location,
      recruiterProfileImage:recruiterProfileUrl,
      companyLogo:companyLogoUrl
    },
    { new: true, upsert: true },
  );
  //await profile.save();
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

export {updateRecruiterProfile};