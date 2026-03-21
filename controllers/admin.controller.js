import User from "../models/signup.js";
import recruiterProfile from "../models/recruiterProfile.js";
import candidateProfile from "../models/candiateProfile.js";
import Job from "../models/job.js";
import applicationSchema from "../models/applicationSchema.js";

const getAdminDashboard = async (req,res)=>{
    try {
        const totalUsers = await User.countDocuments();
        const totalRecruiters = await recruiterProfile.countDocuments();
        const totalCandidates = await candidateProfile.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalHired = await applicationSchema.countDocuments({
            status:"hired"
        });
        const totalActiveUsers = await User.countDocuments({
            status:"active"
        });
        const totalBannedUsers = await User.countDocuments({
            status:"banned"
        });
        const totalActiveRecruiters = await recruiterProfile.countDocuments({
            status:"active"
        });
        const totalBannedRecruiters = await recruiterProfile.countDocuments({
          status: "banned",
        }); 
        return res.status(200).json({
            success:true,
            message:"success fully admin page created",
            totalUsers,
            totalCandidates,
            totalRecruiters,
            totalJobs,
            totalHired,
            totalActiveUsers,
            totalBannedUsers,
            totalActiveRecruiters,
            totalBannedRecruiters
        })
    } catch (err) {
       return res.status(500).json({
        success:false,
        json:"Internal server error"
       }) 
    }
}

 const getAllJobs = async (req,res) => {
    try {
      const allJobs = await Job.find()
        .select("_id title status recruiter applicationsCount")
        .populate("recruiter", "companyName status");
      console.log(allJobs);
      return res.status(200).json({
        success: true,
        allJobs,
      });
    } catch (err) {
    return  res.status(500).json({
        success:false,
        message:"Internal server error"
    });

    }
}  

 const banUser = async (req, res) => {
   try {
     await User.findByIdAndUpdate(req.params.id, { status: "banned" });
     return res.status(200).json({ success: true, message: "User banned" });
   } catch (err) {
     return res
       .status(500)
       .json({ success: false, message: "Internal server error" });
   }
 };

  const unbanUser = async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, { status: "active" });
      return res.status(200).json({ success: true, message: "User unbanned" });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
  const banRecruiter = async (req, res) => {
    try {
      const recruiterId = req.params.id;
      await recruiterProfile.findByIdAndUpdate(recruiterId, {
        status: "banned",
      });

      // Optional: close all jobs
      await Job.updateMany({ recruiter: recruiterId }, { status: "closed" });

      return res
        .status(200)
        .json({ success: true, message: "Recruiter banned and jobs closed" });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
  const unbanRecruiter = async (req, res) => {
    try {
      await recruiterProfile.findByIdAndUpdate(req.params.id, {
        status: "active",
      });
      return res
        .status(200)
        .json({ success: true, message: "Recruiter unbanned" });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
 const closeJob = async (req, res) => {
   try {
     await Job.findByIdAndUpdate(req.params.id, { status: "closed" });
     return res.status(200).json({ success: true, message: "Job closed" });
   } catch (err) {
     return res
       .status(500)
       .json({ success: false, message: "Internal server error" });
   }
 };

  const reopenJob = async (req, res) => {
    try {
      await Job.findByIdAndUpdate(req.params.id, { status: "open" });
      return res.status(200).json({ success: true, message: "Job reopened" });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  };
export { getAdminDashboard, getAllJobs, banUser, unbanUser,banRecruiter,unbanRecruiter,closeJob,reopenJob };