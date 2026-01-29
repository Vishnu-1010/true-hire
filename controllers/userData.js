
import userSchema from "../models/signup.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const homePage = (req, res) => {
  res.send("home");
};
const loginPage = (req, res) => {
  res.send("login");
};
const signupPage = async(req, res) => {

  try{
    let {fullName,email,password,role }= req.body;
    console.log(fullName,email,password,role);
 if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required"
    });
  }
  }catch(err){
    console.log("signup page error");
    res.status(500).send("Internal server error");
  }
}


// res.send(fullName, email, password, role);
// };
const profilePage =(req,res) =>{
  res.send("profile");
}
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const userEmail = await userSchema.findOne({ email });
    console.log(userEmail);
    if (!userEmail) {
      return res.status(404).json({ msg: `user doesn't exist` });
    }
    const LoginToken = await bcrypt.compare(password, userEmail.password);
    const jwtSignToken = jwt.sign(
      { email: userEmail.email },
      process.env.SECRET,
      { expiresIn: "1hr" }
    );
    console.log(jwtSignToken);
    res.cookie("Token", jwtSignToken);
    res.status(200).redirect("/profile");
  } catch (err) {
    res.status(400).json({ error: "unable to login" });
  }
};

const userSignup = async (req, res) => {
  try {
    const { fullName, email, password, conformPassword, role } = req.body;
    if (password !== conformPassword) {
      return res.status(400).send("passswod is not matching");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userSchema.create({
      fullName,
      email,
      password: hashPassword,
      role,
    });
    console.log(newUser);
    await newUser.save();
    res.status(200).redirect("/profile");
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: "unanle to singup" });
  }
};
export { homePage, loginPage, signupPage, userSignup, userLogin, profilePage };
