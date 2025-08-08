const express = require("express");
const { homePage, loginPage, signupPage,userSignup } = require("../controllers/userData");
const router = express.Router();

//homepage
router.get("/", homePage);
//login page
router.get("/login", loginPage);
//signup page
router.get("/signup", signupPage);
//page not found
router.post("/signup",userSignup);

module.exports = router;
