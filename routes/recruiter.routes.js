import express from "express";
const router = express();

import { userVerify } from "../middleware/userVerify.js";
import { createRecruiter,getRecruiter,updateRecruiter } from "../controllers/recruiter.controller.js";
import { recruiterOnly } from "../middleware/roles.js";
import { upload } from "../middleware/multer.js";
router.post(
  "/profile",
  userVerify,
  recruiterOnly,
  upload.fields([
    { name: "recruiterImage", maxCount: 1 },
    { name: "companyLogos", maxCount: 1 },
  ]),
  createRecruiter,
);
router.get("/profile",userVerify,recruiterOnly,getRecruiter);
router.put("/profile",userVerify,recruiterOnly, upload.fields([
    { name: "recruiterImage", maxCount: 1 },
    { name: "companyLogos", maxCount: 1 },
  ]),updateRecruiter);
export default router;