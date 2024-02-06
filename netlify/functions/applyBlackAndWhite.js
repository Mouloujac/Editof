
const sharp = require("sharp");

exports.handler = async (event, context) => {
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
        res.set("Access-Control-Allow-Origin", "*")
        res.send(modifiedImageData);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    
}