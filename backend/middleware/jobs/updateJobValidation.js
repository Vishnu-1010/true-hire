const updateJobValidator = (req, res, next) => {
  try {
    const { salary, experienceYears, skills, location, requirements } =
      req.body;

    if (salary !== undefined) {
      if (
        typeof salary !== "object" ||
        salary.min == null ||
        salary.max == null ||
        salary.min > salary.max
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid salary range",
        });
      }
    }

    if (experienceYears !== undefined) {
      if (
        typeof experienceYears !== "object" ||
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

    if (skills !== undefined) {
      if (typeof skills === "string") {
        req.body.skills = [skills];
      } else if (!Array.isArray(skills)) {
        return res.status(400).json({
          success: false,
          message: "Skills must be string or array",
        });
      }
    }

    if (location !== undefined) {
      if (typeof location === "string") {
        req.body.location = [location];
      } else if (!Array.isArray(location)) {
        return res.status(400).json({
          success: false,
          message: "Location must be string or array",
        });
      }
    }

    if (requirements !== undefined) {
      if (typeof requirements === "string") {
        req.body.requirements = [requirements];
      } else if (!Array.isArray(requirements)) {
        return res.status(400).json({
          success: false,
          message: "Requirements must be string or array",
        });
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export { updateJobValidator };
