const LoginValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "both email and password are require",
    });
  }
  const emailRegression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegression.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "enter a valid email address",
    });
  }
  if (password.trim().length < 8) {
    return res.status(400).json({
      success: false,
      message: "password length must be greater than 8",
    });
  }
  next();
};
export { LoginValidation };
