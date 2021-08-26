const express = require("express");
var http = require('http');
const path = require('path');
const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

app.get("/posts", (req, res) => {
  res.send("Hello Post Page");
});



