const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sharp = require("sharp");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));


app.get("/status", (req, res) => {
  res.send("Server is running");
});

module.exports = app; 
