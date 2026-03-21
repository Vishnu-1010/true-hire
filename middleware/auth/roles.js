import {authorizeRoles} from "./userVerify.js";
const candidateOnly = authorizeRoles("candidate");
const recruiterOnly = authorizeRoles("recruiter");

const adminOnly = (req,res,next)=>{
    if(req.user.role !== "admin"){
        return res.status(403).json({
            success:false,
            message:"Admin only"
        })
    }
    next();
}

export {candidateOnly,recruiterOnly,adminOnly};