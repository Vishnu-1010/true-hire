import express from "express";
const router = express.Router();
import { allJobsDashboard } from "../controllers/dashboard.controller.js";
import { userVerify } from "../middleware/auth/userVerify.js";
import { createRecruiter,getRecruiter,updateRecruiter } from "../controllers/recruiter.controller.js";
import { recruiterOnly } from "../middleware/auth/roles.js";
import { upload } from "../middleware/upload/multer.js";


router.get("/profile",userVerify,recruiterOnly,getRecruiter);
router.post( "/profile",userVerify,recruiterOnly,upload.fields([{ name: "recruiterImage", maxCount: 1 },{ name: "companyLogos", maxCount: 1 },]),createRecruiter);
router.put("/profile",userVerify,recruiterOnly, upload.fields([{ name: "recruiterImage", maxCount: 1 },{ name: "companyLogos", maxCount: 1 },]),updateRecruiter);

//recruiter dash board
router.get("/dashboard",userVerify,recruiterOnly,allJobsDashboard);

export default router;