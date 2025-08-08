const express = require("express");
const app = express();
const port = process.env.PORT;
const path = require("path");
require('dotenv').config();

const userRoutes = require("./routes/userRoutes");
const connectDB = require('./config/mongodb');
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", userRoutes);

//page not found handler
app.use((req, res) => {
  res.status(404).render('pageNotFound')
});

app.listen(port, () => {
  console.log(`port is listening ${port}`);
});
