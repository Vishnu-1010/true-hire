import User from  "../../models/signup.js"
import jwt from "jsonwebtoken";
const userVerify = async(req, res, next) => {
  try {
    const token =req.cookies.Token ||req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.status === "banned") {
      return res.status(403).json({
        success: false,
        message: "Your account is banned",
      });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden: Invalid token" });
  }
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    next();
  };
};

export { userVerify, authorizeRoles };
