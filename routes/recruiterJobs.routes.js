import express from "express";
const router = express.Router();
import { userVerify } from "../middleware/auth/userVerify.js";
import { recruiterOnly } from "../middleware/auth/roles.js";
import {createJob,updateJob,deleteJob,getAllJob} from "../controllers/jobs.controller.js";

import { getJob } from "../controllers/jobs.controller.js";
import {getJobApplications} from "../controllers/dashboard.controller.js"
//middleware
import {createJobValidator} from "../middleware/jobs/createJobValidator.js"
import { updateJobValidator } from "../middleware/jobs/updateJobValidation.js";

//recruiter
router.post("/create", userVerify, recruiterOnly, createJobValidator,createJob);
router.put("/:id",userVerify,recruiterOnly,updateJobValidator,updateJob);
router.delete("/:id",userVerify,recruiterOnly,deleteJob)

//get job
router.get("/:id",userVerify,recruiterOnly,getJob); //single job
router.get("/",userVerify,recruiterOnly,getAllJob); // all jobs

// all applications
router.get("/:jobId/applications",userVerify,recruiterOnly,getJobApplications);

export default router;
