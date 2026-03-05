import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import connectDB from "./config/mongodb.js";
import { homePage, userLogin, userSignup } from "./controllers/authentication.controller.js";
import cors from "cors";
const app = express();
const port = process.env.PORT;

connectDB()
  .then(() => {
    console.log("successfully connected to db");
  })
  .catch(() => {
    console.log("unable to connect to db");
  });
//setting up cors
app.use(
  cors({
    origin: ["http://localhost/5173", "http://localhost/3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//setting cookie-parser
app.use(cookieParser());

// to parse all middle ware to routes
app.use(userRoutes);

app.use("/login", userLogin);
app.use("/signup", userSignup);
//default handler
app.use("/", homePage);

//page not found handler
app.use((req, res) => {
  res.status(404).send("pageNotFound");
});

app.listen(port, () => {
  console.log(`port is listening ${port}`);
});
