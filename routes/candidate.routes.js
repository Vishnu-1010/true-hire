import express from "express";
import { createCandidate, getCandidate,updateCandidate} from "../controllers/candidate.controller.js";
import { userVerify } from "../middleware/userVerify.js";
import { candidateOnly } from "../middleware/roles.js";
import { upload } from "../middleware/multer.js";

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

export default router;
