const validateSignUp = (req, res, next) => {
  let { fullName, email, password, role } = req.body;
  req.body.email = email.toLowerCase();
  if (
    !fullName?.trim() ||
    !email?.trim() ||
    !password?.trim() ||
    !role?.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "password length must be greater than 8",
    });
  }
  const emailRegression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegression.test(email)) {
    return res.status(400).json({
      success: false,
      message: "enter a valid email address",
    });
  }
  const validRoles = ["candidate", "recruiter"];
  if (!validRoles.includes(role.toLowerCase())) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid role selected" });
  }
  next();
};
export { validateSignUp };
