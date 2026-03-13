import Job from "../models/job.js";
import recruiterProfile from "../models/recruiterProfile.js";


const createJob = async (req, res) => {
  try {
    const id = req.user?.id;
   
 
    if (req.user?.role !== "recruiter" ) {
      return res.status(403).json({
        success: false,
        message: "only recruiter can post jobs",
      });
    }
    const profile = await recruiterProfile.findOne({ user: id });

    if (!profile) {
      return res.status(400).json({
        message: "Create recruiter profile first",
      });
    }

let {title,description,location,skills,requirements,jobType,salary,experienceLevel,experienceYears, status} = req.body;
      if(skills){
              skills = [...new Set(skills.split(",").map((v) => v.trim().toLowerCase()))];
      }
      if (location ) {
        location = [...new Set(location.split(",").map((v) => v.trim().toLowerCase()))];
      }
      if(requirements){

         requirements = [...new Set(requirements.split(",").map((v) => v.trim().toLowerCase()))];
      }
    let {min=0,max=0} = salary || {};
    let {minYear=0,maxYear=0} = experienceYears || {};
    if (min > max) {
      return res.status(400).json({
        message: "Invalid salary range",
      });
    }
    const job = await Job.create({
      recruiter: id,
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
 

    res.status(200).json({
      success:true,
      message:"successfully added job",
      job
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getJob = async (req,res)=>{
  try {
    const id = req.params?.id;
 
     const job = await Job.findById(id)
       .populate({
         path: "recruiter",
         select: "companyName companyWebsite companyLogo",
         populate: {
           path: "recruiter",
           select: "fullName email",
         },
       })
       .populate({
         path: "Application",
        select:"resume coverLetter status",
         populate: {
           path: "applicant",
           select: "fullName email",
         },
       });
    console.log(job);

     if (!job) {
       return res.status(404).json({
         success: false,
         message: "Job not found",
       });
      }
      return res.status(200).json({
       success:true,
       data:job
      });
  } catch (err) {
    return res.status(500).json({
      success:false,
      message:"Internal server error",
      error:err.message
    });
  }
}

const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user?.id;

    const job = await Job.findById(jobId)

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

    let {title,description,skills,location,requirements,jobType,salary,experienceLevel,experienceYears,status,} = req.body;

    if (skills) {
      skills = [...new Set(skills.map((v) => v.trim().toLowerCase()))];
      job.skills = skills;
    }

    if (location) {
      location = [...new Set(location.map((v) => v.trim().toLowerCase()))];
      job.location = location;
    }

    if (requirements) {
      requirements = [
        ...new Set(requirements.map((v) => v.trim().toLowerCase())),
      ];
      job.requirements = requirements;
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
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteJob = async(req,res) =>{
  try{
    const jobId = req.params?.id;
    const userId = req.user?.id;
    const job = await Job.findById(jobId);
    if (!jobId) {
      return res.status(404).json({
        success: false,
        message: "job does't exist",
      });
    }
    
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job id",
      });
    }

    if (job.recruiter.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this job",
      });
    }
    await job.deleteOne();
  }catch(err){
    return res.status(500).json({
      success:false,
      error:"Internal server error"
    })
  }
}

export { createJob,getJob,updateJob,deleteJob };
