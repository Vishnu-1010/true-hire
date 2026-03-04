import jwt from "jsonwebtoken";

const userVerify = (req, res, next) => {
  const verifyToken = req.cookies.Token || req.headers.authorization?.split(" ")[1];

 
  if (!verifyToken) {
    return res.status(401).json({ success: false, message: "unauthorized" });
  }

  jwt.verify(verifyToken, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      return res.status(403).json({ success:false,message: "Invalid User" });
    }
    req.user = data;
    next();
  });
};
export { userVerify };
