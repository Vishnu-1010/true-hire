const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("hi express");
});
app.listen(port, () => {
  console.log(`port is listening ${port}`);
});
