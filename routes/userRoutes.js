import express from "express";
import {
  userSignup,
  userLogin,
  userProfile,
  homePage,
} from "../controllers/userData.js";
import { validateSignUp } from "../middleware/signupValidation.js";
import { userVerify } from "../middleware/userVerify.js";
import { LoginValidation } from "../middleware/LoginValidation.js";
const router = express.Router();

//homepage
router.get("/", homePage);
//login page
router.post("/login", LoginValidation, userLogin);
//signup page
router.post("/signup", validateSignUp, userSignup);

router.get("/profile", userVerify, userProfile);
export default router;
