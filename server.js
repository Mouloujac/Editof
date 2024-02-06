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
    
    const mirrorX = req.body.mirrorX;
    const mirrorY = req.body.mirrorY;
    console.log("x:"+mirrorX)
    console.log("y:"+mirrorY)
    // Decode base64 image data
    const buffer = Buffer.from(imageData, "base64");
    let modifiedImageData
    // Apply Sepia effect using Sharp
    if (mirrorX === "1" && mirrorY === "0"){
      modifiedImageData = await sharp(buffer)
      .recomb([
        [0.393, 0.769, 0.189],
        [0.349, 0.686, 0.168],
        [0.272, 0.534, 0.131],
      ]) // Apply a brownish tint for sepia effect
      .flip()
      .toBuffer();
    }else if(mirrorY === "1" && mirrorX === "0"){
      modifiedImageData = await sharp(buffer)
      .recomb([
        [0.393, 0.769, 0.189],
        [0.349, 0.686, 0.168],
        [0.272, 0.534, 0.131],
      ]) // Apply a brownish tint for sepia effect
      .flop()
      .toBuffer();
    }else if(mirrorY === "1" && mirrorX === "1"){
      modifiedImageData = await sharp(buffer)
      .recomb([
        [0.393, 0.769, 0.189],
        [0.349, 0.686, 0.168],
        [0.272, 0.534, 0.131],
      ]) // Apply a brownish tint for sepia effect
      .flip()
      .flop()
      .toBuffer();
    }else{
      modifiedImageData = await sharp(buffer)
      .recomb([
        [0.393, 0.769, 0.189],
        [0.349, 0.686, 0.168],
        [0.272, 0.534, 0.131],
      ]) // Apply a brownish tint for sepia effect
      .toBuffer();
    }
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

app.post("/applyBlackAndWhite", async (req, res) => {
  try {
    const imageData = req.body.imageData;
    const mirrorX = req.body.mirrorX;
    const mirrorY = req.body.mirrorY;
    console.log("x:"+mirrorX)
    console.log("y:"+mirrorY)
    // Decode base64 image data
    const buffer = Buffer.from(imageData, "base64");
    let modifiedImageData
    // Apply Sepia effect using Sharp
    if (mirrorX === "1" && mirrorY === "0"){
      modifiedImageData = await sharp(buffer)
      .greyscale() // Apply a brownish tint for sepia effect
      .flip()
      .toBuffer();
    }else if(mirrorY === "1" && mirrorX === "0"){
      modifiedImageData = await sharp(buffer)
      .greyscale() // Apply a brownish tint for sepia effect
      .flop()
      .toBuffer();
    }else if(mirrorY === "1" && mirrorX === "1"){
      modifiedImageData = await sharp(buffer)
      .greyscale() // Apply a brownish tint for sepia effect
      .flip()
      .flop()
      .toBuffer();
    }else{
      modifiedImageData = await sharp(buffer)
      .greyscale() // Apply a brownish tint for sepia effect
      .toBuffer();
    }
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

app.post("/applyJustMirroring", async (req, res) => {
  try {
    const imageData = req.body.imageData;
    const mirrorX = req.body.mirrorX;
    const mirrorY = req.body.mirrorY;
    console.log("x:"+mirrorX)
    console.log("y:"+mirrorY)
    // Decode base64 image data
    const buffer = Buffer.from(imageData, "base64");

    let modifiedImageData;
    // Apply mirroring effect using Sharp
    if (mirrorX === "1" && mirrorY === "0"){
      modifiedImageData = await sharp(buffer)
        .flip()
        .toBuffer();
    } else if(mirrorY === "1" && mirrorX === "0"){
      modifiedImageData = await sharp(buffer)
        .flop()
        .toBuffer();
    } else if(mirrorY === "1" && mirrorX === "1"){
      modifiedImageData = await sharp(buffer)
        .flip()
        .flop()
        .toBuffer();
    } else {
      modifiedImageData = await sharp(buffer)
        .toBuffer();
    }
    
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
