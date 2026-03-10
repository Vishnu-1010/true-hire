import {authorizeRoles} from "./userVerify.js";
const candidateOnly = authorizeRoles("candidate");
const recruiterOnly  = authorizeRoles("recruiter");

export {candidateOnly,recruiterOnly};