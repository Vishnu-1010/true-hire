const recruiterOnly = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
  next();
};
export {recruiterOnly};