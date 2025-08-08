const homePage = (req,res)=>{
    res.render("home");
}
const loginPage = (req,res)=>{
    res.render("login");
}
const signupPage = (req,res)=>{
    res.render('signup');
}

const userSignup = (req,res)=>{
  const {fullName,email,password,conformPassword} = req.body;
  console.log(email);

}
module.exports = {homePage,loginPage,signupPage,userSignup};