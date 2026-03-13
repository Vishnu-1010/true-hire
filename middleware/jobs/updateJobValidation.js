const validateUpdateJob = (req, res, next) => {
  const { salary, experienceYears, skills, location, requirements } = req.body;

  if (salary) {
    if (salary.min == null || salary.max == null || salary.min > salary.max) {
      return res.status(400).json({
        success: false,
        message: "Invalid salary range",
      });
    }
  }

  if (experienceYears) {
    if (
      experienceYears.minYear == null ||
      experienceYears.maxYear == null ||
      experienceYears.minYear > experienceYears.maxYear
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid experience range",
      });
    }
  }

  if (skills && !Array.isArray(skills)) {
    return res.status(400).json({
      success: false,
      message: "Skills must be an array",
    });
  }

  if (location && !Array.isArray(location)) {
    return res.status(400).json({
      success: false,
      message: "Location must be an array",
    });
  }

  if (requirements && !Array.isArray(requirements)) {
    return res.status(400).json({
      success: false,
      message: "Requirements must be an array",
    });
  }

  next();
};

export  {validateUpdateJob};
