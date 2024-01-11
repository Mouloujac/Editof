const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const sharp = require("sharp");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));



app.post("/applySepia", async (req, res) => {
  try {
    const imageData = req.body.imageData;

    // Decode base64 image data
    const buffer = Buffer.from(imageData, "base64");

    // Apply Sepia effect using Sharp
    const modifiedImageData = await sharp(buffer)
    .recomb([
      [0.393, 0.769, 0.189],
      [0.349, 0.686, 0.168],
      [0.272, 0.534, 0.131],
     ]) // Apply a brownish tint for sepia effect
      .toBuffer();

    // Save the modified image to a file (optional)
    fs.writeFileSync("modifiedImage.jpg", modifiedImageData);

    // Send the modified image data in the response
    res.set("Content-Type", "image/jpeg");
    res.set("Content-Disposition", "attachment; filename=modifiedImage.jpg");
    res.send(modifiedImageData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/applyBlackAndWhite", async (req, res) => {
  try {
    const imageData = req.body.imageData;

    // Decode base64 image data
    const buffer = Buffer.from(imageData, "base64");

    // Apply Sepia effect using Sharp
    const modifiedImageData = await sharp(buffer)
      .greyscale() // Apply a brownish tint for sepia effect
      .toBuffer();

    // Save the modified image to a file (optional)
    

    // Send the modified image data in the response
    res.set("Content-Type", "image/jpeg");
    res.set("Content-Disposition", "attachment; filename=modifiedImage.jpg");
    res.send(modifiedImageData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
