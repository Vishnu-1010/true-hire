import express from "express";


//controllers
import { userSignup, userLogin,logout} from "../controllers/authentication.controller.js";

//middlewares
import { validateSignUp } from "../middleware/auth/signupValidation.js";

import { LoginValidation } from "../middleware/auth/LoginValidation.js";

const router = express.Router();
const app = express();


//login page
router.post("/login", LoginValidation, userLogin);
//signup page
router.post("/signup", validateSignUp, userSignup);

router.post("/logout",logout);
export default router;
