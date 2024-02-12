const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sharp = require("sharp");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "300mb" }));
app.use(bodyParser.urlencoded({ limit: "300mb", extended: true }));


app.get("/status", (req, res) => {
  res.send("Server is running");
});

module.exports = app; 
