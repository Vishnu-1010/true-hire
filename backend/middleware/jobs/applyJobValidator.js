const applyJobValidator = (req,res,next)=>{
try {
    const { gitHubLink, portfolioLink }=req.body;

     if (!gitHubLink ) {
       return res.status(400).json({
         success: false,
         message: "At least one profile link is required",
       });
     }

     const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/;

     if (
       (gitHubLink && !urlPattern.test(gitHubLink)) ||
       (portfolioLink && !urlPattern.test(portfolioLink))
     ) {
       return res.status(400).json({
         success: false,
         message: "Invalid URL format",
       });
     }

     const resume = req.files?.resume[0];

       if (!req.files || !req.files?.resume) {
         return res.status(400).json({
           success: false,
           message: "Resume is required",
         });
       }
     
    if(resume?.mimetype !== "application/pdf") {
        return res.status(400).json({
            success:false,
            message:"Invalid resume type resume must be in pdf"
        });

    }
     if (resume?.size > 2 * 1024 * 1024) {
       return res.status(400).json({
         success: false,
         message: "Resume must be less than 2MB",
       });
     }
    next();
} catch (err) {
    return res.status(500).json({
        success:false,
        message:"Internal server error"
    })
}
}

export{applyJobValidator};