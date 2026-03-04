import express from "express";
//controllers
import { userSignup, userLogin,homePage,} from "../controllers/authentication.controller.js";
import { updateCandidateProfile } from "../controllers/candidate.controller.js";
import { updateRecruiterProfile } from "../controllers/recruiter.controller.js";
//middlewares
import { validateSignUp } from "../middleware/signupValidation.js";
import { userVerify } from "../middleware/userVerify.js";
import {candidateOnly} from "../middleware/candidateMiddleware.js"
import {recruiterOnly} from "../middleware/recruiterMiddleware.js"
import { LoginValidation } from "../middleware/LoginValidation.js";

import {upload} from "../middleware/multer.js"
const router = express.Router();

//homepage
router.get("/", homePage);
//login page
router.post("/login", LoginValidation, userLogin);
//signup page
router.post("/signup", validateSignUp, userSignup);

router.post(
  "/candidate/profile",
  userVerify,candidateOnly,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateCandidateProfile
);
router.post(
  "/recruiter/profile",
  userVerify,
  recruiterOnly,
  upload.fields([
    { name: "recruiterImage", maxCount: 1 },
    { name: "companyLogo", maxCount: 1 },
  ]),
  updateRecruiterProfile,
);

export default router;
