import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/mongodb.js";
import { homePage,loginPage,signupPage } from "./controllers/userData.js";

const app = express();
const port = process.env.PORT;

connectDB()
  .then(() => {
    console.log("successfully connected to db");
  })
  .catch(() => {
    console.log("unable to connect to db");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//setting cookie-parser
app.use(cookieParser());
app.use("/login",loginPage);
app.use("/signup",signupPage);
//default handler
app.use("/",homePage);

//page not found handler
app.use((req, res) => {
  res.status(404).send("pageNotFound");
});

app.listen(port, () => {
  console.log(`port is listening ${port}`);
});
