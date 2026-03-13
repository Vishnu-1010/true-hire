import express from "express";
import { createCandidate, getCandidate,updateCandidate} from "../controllers/candidate.controller.js";
import { userVerify } from "../middleware/auth/userVerify.js";
import { candidateOnly } from "../middleware/auth/roles.js";
import { upload } from "../middleware/upload/multer.js";

const router = express.Router();

router.post(
  "/candidate/profile",
  userVerify,
  candidateOnly,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  createCandidate,
);
router.get("/profile",userVerify,candidateOnly,getCandidate);
router.put("/profile",userVerify,candidateOnly, upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),updateCandidate);

  //search & filter jobs
  

export default router;
