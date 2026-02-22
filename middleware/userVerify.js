import jwt from "jsonwebtoken";

const userVerify = (req, res, next) => {
  const verifyToken = req.cookies.Token;

  if (!verifyToken) {
    return res.status(400).json({ message: "Invalid token" });
  }

  jwt.verify(verifyToken, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      return res.status(403).json({ message: "Invalid User" });
    }
    req.user = data;
    next();
  });
};
export { userVerify };
