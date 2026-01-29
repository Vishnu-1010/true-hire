import express from "express";
import {
  homePage,
  loginPage,
  signupPage,
  userSignup,
  userLogin,
  profilePage,
} from "../controllers/userData.js";
import { userVerify } from "../middleware/userVerify.js";
const router = express.Router();

//homepage
router.get("/", homePage);
//login page
router.post("/login", loginPage);
//signup page
router.post("/signup", signupPage);


router.get("/profile", userVerify, profilePage);
export default router;
