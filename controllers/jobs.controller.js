import mongoose, { now } from "mongoose";
import Job from "../models/job.js";
import recruiterProfile from "../models/recruiterProfile.js";


const createJob = async (req, res) => {
  try {
    const id = req.user.id;
    
    if (req.user?.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "only recruiter can post jobs",
      });
    }
    const profile = await recruiterProfile.findOne({ recruiter: id });
    
    if (!profile) {
      return res.status(400).json({
        message: "Create recruiter profile first",
      });
    }

let {title,description,location,skills,requirements,jobType,salary,experienceLevel,experienceYears,status} = req.body;
    
  if (skills) {
      skills = [
        ...new Set(skills.split(",").map((v) => v.trim().toLowerCase())),
      ];
    }
    if (location) {
      location = [
        ...new Set(location.split(",").map((v) => v.trim().toLowerCase())),
      ];
    }
    if (requirements) {
      requirements = [
        ...new Set(requirements.split(",").map((v) => v.trim().toLowerCase())),
      ];
    }
    let { min = 0, max = 0 } = salary || {};
    let { minYear = 0, maxYear = 0 } = experienceYears || {};
    if (min > max) {
      return res.status(400).json({
        message: "Invalid salary range",
      });
    }

    let job = await Job.create({
      recruiter: profile._id,// reference to profile
      title,
      description,
      skills: skills,
      location: location,
      requirements: requirements,
      jobType,
      salary: { min, max },
      experienceLevel,
      experienceYears: { minYear, maxYear },
      status,
      applicationsCount: 0,
    });

    return res.status(200).json({
      success: true,
      message: "successfully added job",
      job,

    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const getJob = async (req, res) => {
  try {
    const id = req.params.id;

        if (!job) {
          return res.status(401).json({
            success: false,
            message: "unauthorized",
          });
        }
   const job = await Job.findById(id)
     .populate("recruiter", "companyName companyWebsite companyLogo")
     .populate({
       path: "applications",
       select: "resume coverLetter status",
       populate: {
         path: "applicant",
         select: "fullName email",
       },
     });
    
    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
const getAllJob = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
 const page = Math.max(parseInt(req.query.page) || 1, 1);
 const limit = Math.min(parseInt(req.query.limit) || 10, 50);
 const skip = (page - 1) * limit;
    const { search, location, skills, jobType, experienceLevel } = req.query;

    const query = { status: "open",recruiter:id,deadline:{$gte:new Date()} };
    if (search) {
      query.$or=[  { title: { $regex: search, $options: "i" } },
  { description: { $regex: search, $options: "i" } },
];
    }

    if (location) {
      const locations = location.split(",").map((loc) => loc.toLowerCase().trim());;
        query.location = {
          $in: locations.map((loc) => new RegExp(loc, "i")),
        };
    }

    if (skills) {
      const skillsArray = skills.split(",").map((s)=> s.toLowerCase());
      query.skills = { $in: skillsArray };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 }) // lastest post
      .skip(skip) 
      .limit(limit) // max no of jobs
      .populate("recruiter", "companyName companyLogo");
    const totalJobs = await Job.countDocuments(query);

    return res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalJobs / limit),
      totalJobs,
      data: jobs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};



const updateJob = async (req, res) => { 
  try {
    const jobId = req.params.id;
    const userId = req.user.id;

    if (!jobId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.recruiter.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this job",
      });
    }

const {title,description,skills,location,requirements,jobType,salary,experienceLevel,experienceYears,status} = req.body;

    if (skills) {
      const skillsArray = skills.map((v) => v.trim().toLowerCase());
      const oldSkills = job.skills;
      
      job.skills = [...new Set([...skillsArray,...oldSkills])];
    }

    if (location) {
      const locationArray = location.map((v) => v.trim().toLowerCase());
      const oldLocation = job.location;
      job.location = [...new Set([...oldLocation,...locationArray])];
    }

    if (requirements) {
      const requirementsArray = requirements.map((v) => v.trim().toLowerCase());
      const oldRequirement = job.requirements;
      job.requirements = [...new Set([...requirementsArray,...oldRequirement])];
    }

    if (title) job.title = title;
    if (description) job.description = description;
    if (jobType) job.jobType = jobType;
    if (experienceLevel) job.experienceLevel = experienceLevel;
    if (salary) job.salary = salary;
    if (experienceYears) job.experienceYears = experienceYears;
    if (status) job.status = status;

    await job.save();

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const deleteJob = async (req, res) => {
  try {
 const jobId = req.params.id;
 const userId = req.user.id;

    
    
 if (!job) {
   return res.status(404).json({
     success: false,
     message: "job does't exist",
   });
 }
 if(!userId) {
  return res.status(401).json({
    success:false,
    message:"unauthorized"
  })
 }

    const job = await Job.findById(jobId);


    if (!job.recruiter || job.recruiter.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this job",
      });
    }
    job.status = "deleted";
    await job.save();
      return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export { createJob, getJob, updateJob, deleteJob,getAllJob  };
