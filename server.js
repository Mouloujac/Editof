const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sharp = require("sharp");

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// Retirez la définition des routes
// Gardez juste la configuration du serveur

// Définissez simplement un point de terminaison pour le statut du serveur
app.get("/status", (req, res) => {
  res.send("Server is running");
});

module.exports = app; // Exportez votre application Express
