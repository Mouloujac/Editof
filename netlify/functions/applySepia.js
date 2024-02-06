// netlify/functions/applySepia.js

const sharp = require("sharp");

exports.handler = async (event, context) => {
  try {
    if (!event.body) {
      throw new Error("Le corps de la requête est vide."+event);
    }

    const { imageData, mirrorX, mirrorY } = JSON.parse(event.body);
    // Decode base64 image data
    const buffer = Buffer.from(imageData, "base64");
    
    let modifiedImageData;
    
    // Appliquer l'effet sepia en fonction des options de miroir
    if (mirrorX === "1" && mirrorY === "0") {
      modifiedImageData = await sharp(buffer)
        .recomb([
          [0.393, 0.769, 0.189],
          [0.349, 0.686, 0.168],
          [0.272, 0.534, 0.131],
        ]) // Appliquer un effet brunâtre pour l'effet sepia
        .flip()
        .toBuffer();
    } else if (mirrorY === "1" && mirrorX === "0") {
      modifiedImageData = await sharp(buffer)
        .recomb([
          [0.393, 0.769, 0.189],
          [0.349, 0.686, 0.168],
          [0.272, 0.534, 0.131],
        ]) // Appliquer un effet brunâtre pour l'effet sepia
        .flop()
        .toBuffer();
    } else if (mirrorY === "1" && mirrorX === "1") {
      modifiedImageData = await sharp(buffer)
        .recomb([
          [0.393, 0.769, 0.189],
          [0.349, 0.686, 0.168],
          [0.272, 0.534, 0.131],
        ]) // Appliquer un effet brunâtre pour l'effet sepia
        .flip()
        .flop()
        .toBuffer();
    } else {
      modifiedImageData = await sharp(buffer)
        .recomb([
          [0.393, 0.769, 0.189],
          [0.349, 0.686, 0.168],
          [0.272, 0.534, 0.131],
        ]) // Appliquer un effet brunâtre pour l'effet sepia
        .toBuffer();
    }

    // Envoyer les données de l'image modifiée dans la réponse
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": "attachment; filename=modifiedImage.jpg"
      },
      body: modifiedImageData.toString("base64"),
      isBase64Encoded: true
    };
  } catch (error) {
    console.error("Erreur :", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: "Erreur interne du serveur" })
    };
  }
};
