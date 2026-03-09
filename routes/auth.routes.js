import express from "express";


//controllers
import { userSignup, userLogin,} from "../controllers/authentication.controller.js";

//middlewares
import { validateSignUp } from "../middleware/signupValidation.js";

import { LoginValidation } from "../middleware/LoginValidation.js";

const router = express.Router();
const app = express();


//login page
router.post("/login", LoginValidation, userLogin);
//signup page
router.post("/signup", validateSignUp, userSignup);

export default router;
