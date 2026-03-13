import express from "express";
const router = express();
import { userVerify } from "../middleware/auth/userVerify.js";
import { recruiterOnly } from "../middleware/auth/roles.js";
import {createJob,updateJob,deleteJob,} from "../controllers/jobs.controller.js";

import { getJob } from "../controllers/jobs.controller.js";
//middleware
import {createJobValidator} from "../middleware/jobs/createJobValidator.js"
import { validateUpdateJob } from "../middleware/jobs/updateJobValidation.js";

//recruiter
router.post("/", userVerify, recruiterOnly, createJobValidator,createJob);
router.put("/:id",userVerify,recruiterOnly,validateUpdateJob,updateJob);
router.delete("/:id",userVerify,recruiterOnly,deleteJob)

//get job
router.get("/:id",userVerify,recruiterOnly,getJob);
export default router;