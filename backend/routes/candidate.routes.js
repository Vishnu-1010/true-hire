import express from "express";
//controllers
import { createCandidate, getCandidate,updateCandidate} from "../controllers/candidate.controller.js";
import { applyJob, getAJob, getallJobs,getAllApplications,candidateApplicatiom } from "../controllers/candidateDashboard.controller.js";

//middleware
import { userVerify } from "../middleware/auth/userVerify.js";
import { candidateOnly } from "../middleware/auth/roles.js";
import {applyJobValidator} from "../middleware/jobs/applyJobValidator.js"
import { upload } from "../middleware/upload/multer.js";
import  {applyLimiter} from "../middleware/auth/rateLimiter.js"

const router = express.Router();

router.post("/profile",userVerify,candidateOnly,upload.fields([{ name: "profileImage", maxCount: 1 },{ name: "resume", maxCount: 1 },]),createCandidate);
router.get("/profile",userVerify,candidateOnly,getCandidate);
router.put("/profile",userVerify,candidateOnly, upload.fields([{ name: "profileImage", maxCount: 1 },{ name: "resume", maxCount: 1 },]),updateCandidate);

  //search & filter jobs
router.get("/jobs", userVerify, candidateOnly, getallJobs);  
router.get("/jobs/:id",userVerify,candidateOnly,getAJob);
router.post("/jobs/:id/apply",userVerify,candidateOnly,upload.fields([{ name: "resume", maxCount: 1 },{ name: "coverLetter", maxCount: 1 },]),applyJobValidator,applyLimiter,applyJob);

//get all applications
router.get("/applications",userVerify,candidateOnly,getAllApplications);
router.get("/application/:id",userVerify,candidateOnly,candidateApplicatiom);
export default router;
