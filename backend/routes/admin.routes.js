import express from "express";

// middleware
import {userVerify} from "../middleware/auth/userVerify.js";
import {adminOnly } from "../middleware/auth/roles.js";

//controllers
import {getAdminDashboard,getAllJobs,banRecruiter,banUser,closeJob,reopenJob,unbanRecruiter,unbanUser} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/dashboard", userVerify, adminOnly, getAdminDashboard);
router.get("/jobs", userVerify, adminOnly, getAllJobs);
// Users
router.put("/users/:id/ban", userVerify, adminOnly, banUser);
router.put("/users/:id/unban", userVerify, adminOnly, unbanUser);

// Recruiters
router.put("/recruiters/:id/ban", userVerify, adminOnly, banRecruiter);
router.put("/recruiters/:id/unban", userVerify, adminOnly, unbanRecruiter);

// Jobs
router.put("/jobs/:id/close", userVerify, adminOnly, closeJob);
router.put("/jobs/:id/reopen", userVerify, adminOnly, reopenJob);
export default router;