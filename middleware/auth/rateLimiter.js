import {rateLimit} from "express-rate-limit";

const loginLimter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "too many request try to login after 15 min",
  statusCode: 429,
});

const signupLimter = rateLimit({
windowMs:15*60*1000,
max:3,
message:`too many signup try to sign up after some time`,
statusCode:429,

});
const applyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message:"applying job limit excited",
  statusCode: 429,
});
export { loginLimter, signupLimter, searchLimiter, applyLimiter };
//  inject them in routers
