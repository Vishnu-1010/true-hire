const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const homeRoute = require('./routes/homeRoute');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use("/",homeRoute);
app.listen(port, () => {
  console.log(`port is listening ${port}`);
});
