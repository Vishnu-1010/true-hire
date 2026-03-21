import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";

// routes
import authRoutes from "./routes/auth.routes.js";
import candidateRoutes from "./routes/candidate.routes.js";
import recruiterRoutes from "./routes/recruiter.routes.js"
import jobRoutes from "./routes/recruiterJobs.routes.js";
import adminRoutes from "./routes/admin.routes.js"
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;


//connect to mongoDb
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
    origin:  "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//setting cookie-parser
app.use(cookieParser());

//Routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/candidate",candidateRoutes);
app.use("/api/v1/recruiter", recruiterRoutes);
app.use("/api/v1/recruiter/jobs", jobRoutes);
app.use("/api/v1/admin",adminRoutes)
// Default page handler
app.get("/", (req, res) => {
  res.send("Welcome to Job Portal API");
});

//page not found handler
app.use((req, res) => {
  res.status(404).send("pageNotFound");
});

app.listen(port, () => {
  console.log(`port is listening ${port}`);
});
