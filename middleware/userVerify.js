import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
app.use(cookieParser());
const userVerify = (req, res, next) => {
  const verifyToken = req.cookies.Token;

  if (!verifyToken) return res.status(400).json({ message: "Invalid token" });
  const ans = jwt.verify(verifyToken, process.env.SECRET, (err, data) => {
    if (err) return res.status(400).json({ message: "Invaild User" });
    res.send("user sucess");
    req.user = data;
    next();
  });
  console.log(ans);
};
export { userVerify };
