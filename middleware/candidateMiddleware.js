const candidateOnly = (req, res, next) => {
  if (req.user.role !== "candidate") {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
  next();
};
export {candidateOnly}