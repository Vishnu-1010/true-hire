import Job from "../models/job.js";
import applicationSchema from "../models/applicationSchema.js";
import uploadToImageKit from "../utils/imagekitUpload.js";

const getallJobs = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const { search, location, skills, jobType, experienceLevel } = req.query;
    const query = {
      status: "open",
      deadline: { $gte: new Date() }, // only active jobs
    };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (location) {
      const locations = location
        .split(",")
        .map((loc) => loc.toLowerCase().trim());
      query.location = {
        $in: locations.map((loc) => new RegExp(loc, "i")),
      };
    }
    if (skills) {
      const skillsArray = skills.split(",").map((s) => s.toLowerCase().trim());

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
      .populate("recruiter", "companyName companyLogo")
      .lean();

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
      json: "Internal Server error",
    });
  }
};
const getAJob = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "job does't exist",
      });
    }
    const job = await Job.findById(id);
    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      json: "Internal server error",
    });
  }
};

const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const id = req.user.id;

    if (!id) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    if (!jobId) {
      return res
        .status(400)
        .json({ success: false, message: "Job ID missing" });
    }
    const { gitHubLink, portfolioLink } = req.body;
    const resume = req.files?.resume?.[0];
    const coverLetter = req.files?.coverLetter?.[0];

    let resumeUrl, coverLetterUrl;

    if (resume && coverLetter) {
      [resumeUrl, coverLetterUrl] = await Promise.all([
        uploadToImageKit(
          resume.path,
          "/jobportal/candidate/application/resume",
        ),
        uploadToImageKit(
          coverLetter.path,
          "/jobportal/candidate/application/coverLetter",
        ),
      ]);
    } else if (resume) {
      resumeUrl = await uploadToImageKit(
        resume.path,
        "/jobportal/candidate/application/resume",
      );
    }

    if (coverLetter && !coverLetterUrl) {
      coverLetterUrl = await uploadToImageKit(
        coverLetter.path,
        "/jobportal/candidate/application/coverLetter",
      );
    }
    if (!resumeUrl) {
      return res.status(400).json({
        success: false,
        message: "Resume upload failed",
      });
    }

    const applyToJob = await applicationSchema.create({
      applicant: id,
      job: jobId,
      resume: resumeUrl,
      coverLetter: coverLetterUrl || "",
      gitHubLink,
      portfolioLink: portfolioLink || "",
    });

    return res.status(200).json({
      success: true,
      json: "successfully applied to job",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      json: err.message || "Internal server error",
    });
  }
};
const getAllApplications = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res.status(401).json({
        success: false,
        json: "unauthorized",
      });
    }
    const { page = 1, limit = 20 } = req.query;

    const parsedPage = Math.max(parseInt(page) || 1, 1);
    const parsedLimit = Math.max(parseInt(limit) || 20, 1);
    let skip = (parsedPage - 1) * parsedLimit;
    const [applications, totalApplications] = await Promise.allSettled([
      applicationSchema
        .find({ applicant: id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parsedLimit),

      applicationSchema.countDocuments({ applicant: id }),
    ]);
    return res.status(200).json({
      success: true,
      applications,
      totalApplications,
      page: parsedPage,
      limit: parsedLimit,
      total: Math.ceil(totalApplications / parsedLimit),
      message: "Applications fetched successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};
const candidateApplicatiom = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id) {
      return res.status(401).json({
        success: false,
        json: "unauthorized",
      });
    }
    const getApplication = await applicationSchema.find({ applicant: id });
    return res.status(200).json({
      success: true,
      getApplication,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

export {
  getallJobs,
  getAJob,
  applyJob,
  getAllApplications,
  candidateApplicatiom,
};
