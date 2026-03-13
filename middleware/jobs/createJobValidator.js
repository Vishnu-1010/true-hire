const createJobValidator = (req, res, next) => {
  const {
    title,
    description,
    location,
    skills,
    requirements,
    jobType,
    salary,
    experienceLevel,
    experienceYears,
  } = req.body;

  if (
    !title ||
    !description ||
    !location ||
    !skills ||
    !requirements ||
    !jobType ||
    !experienceLevel
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (salary?.min == null || salary?.max == null || salary.min > salary.max) {
    return res.status(400).json({
      success: false,
      message: "Salary range required",
    });
  }

  if (experienceYears?.minYear == null || experienceYears?.maxYear == null) {
    return res.status(400).json({
      success: false,
      message: "Experience years range required",
    });
  }

  next();
};

export {createJobValidator};
