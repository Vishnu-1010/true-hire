import Job from "../models/job.js";
import Application from "../models/applicationSchema.js";


const allJobsDashboard = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const jobs = await Job.find({ recruiter: recruiterId }).select(
      "_id title status",
    );

    const jobIds = jobs.map((job) => job._id); // fixed variable name

    // aggregate application counts
    const statusAggregation = await Application.aggregate([
      { $match: { job: { $in: jobIds } } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusCounts = {};
    statusAggregation.forEach((item) => {
      statusCounts[item._id] = item.count;
    });

    return res.status(200).json({
      totalJobs: jobs.length,
      totalApplications: statusAggregation.reduce((a, b) => a + b.count, 0),
      applied: statusCounts["Applied"] || 0,
      inReview: statusCounts["In-review"] || 0,
      shortlisted: statusCounts["shortlisted"] || 0,
      rejected: statusCounts["rejected"] || 0,
      hired: statusCounts["hired"] || 0,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const getJobApplications = async (req, res) => {
  try {
    const recruiterId = req.user.id;         // recruiter ID from auth middleware
    const { jobId } = req.params;            // job ID
    const { status, page = 1, limit = 10 } = req.query; // query params
    console.log(jobId);
    //  Verify the job belongs to this recruiter
    const job = await Job.find({ _id: jobId, recruiter: recruiterId });
  
    if (!job) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access or job not found"
      });
    }

    //  Build query
    const query = { job: jobId };
    if (status) {
      query.status = status;  // filter by status if provided
    }

    //  Pagination calculation
    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);
    const skip = (parsedPage - 1) * parsedLimit;

    //  Fetch applications
    const applications = await Application.find(query)
      .populate("applicant", "fullName email") // only fetch name + email
      .sort({ createdAt: -1 })                 // latest applications first
      .skip(skip)
      .limit(parsedLimit);

    //  Count total applications for pagination metadata
    const totalApplications = await Application.countDocuments(query); // select(resume form here)

    //  Send response
    return res.status(200).json({
      success: true,
      jobId: job._id,
      jobTitle: job.title,
      page: parsedPage,
      limit: parsedLimit,
      totalApplications,
      applications: applications.map(app => ({
        applicantId: app.applicant._id,
        fullName: app.applicant.fullName,
        email: app.applicant.email,
        resume: app.resume,
        coverLetter: app.coverLetter || null,
        status: app.status,
        appliedAt: app.createdAt
      }))
    });

  } catch (error) {
    console.error("Error in getJobApplications:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};


export { allJobsDashboard, getJobApplications };
