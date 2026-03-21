const createJobValidator = (req, res, next) => {
  const {title,description,location,skills,requirements,jobType,salary,experienceLevel,experienceYears} = req.body;

if (!title.trim() ||!description.trim() ||!location.trim() ||!skills.trim() ||!requirements.trim() ||!jobType ||!experienceLevel) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
console.log(salary);
  if (salary?.min == null || salary?.max == null || salary.min >= salary.max) {
    return res.status(400).json({
      success: false,
      message: "Salary range required",
    });
  }

  if (experienceYears?.maxYear == null) {
    return res.status(400).json({
      success: false,
      message: "Experience yeaars range required",
    });
  }

  next();
};

export {createJobValidator};
