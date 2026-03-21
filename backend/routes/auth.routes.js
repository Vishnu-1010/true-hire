import express from "express";


//controllers
import { userSignup, userLogin,logout} from "../controllers/authentication.controller.js";

//middlewares
import { validateSignUp } from "../middleware/auth/signupValidation.js";
import { loginLimter, signupLimter } from "../middleware/auth/rateLimiter.js";

import { LoginValidation } from "../middleware/auth/LoginValidation.js";

const router = express.Router();


//login page
router.post("/login", LoginValidation, loginLimter, userLogin);
//signup page
router.post("/signup", validateSignUp, signupLimter, userSignup);

router.post("/logout",logout);
export default router;
