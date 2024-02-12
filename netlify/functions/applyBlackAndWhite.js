const sharp = require("sharp");

const handler = async (event) => {
  try {
    switch (event.httpMethod) {
      case "GET":
        return handleGet(event);
      case "POST":
        return handlePost(event);
      case "OPTIONS":
        return handleOptions(event);
      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

function handleGet(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({ dummyKey: `DummyGetVal` }),
    headers: {},
  };
}

async function handlePost(event) {
  // Vérifier si le corps de la requête est vide
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Empty request body" }),
    };
  }

  const { imageData, mirrorX, mirrorY } = JSON.parse(event.body);

  // Décoder les données d'image base64
  const buffer = Buffer.from(imageData, "base64");
  let modifiedImageData;

  // Appliquer l'effet noir et blanc en fonction des options de miroir
  if (mirrorX === "1" && mirrorY === "0") {
    modifiedImageData = await sharp(buffer)
      .greyscale()
      .flip()
      .toBuffer();
  } else if (mirrorY === "1" && mirrorX === "0") {
    modifiedImageData = await sharp(buffer)
      .greyscale()
      .flop()
      .toBuffer();
  } else if (mirrorY === "1" && mirrorX === "1") {
    modifiedImageData = await sharp(buffer)
      .greyscale()
      .flip()
      .flop()
      .toBuffer();
  } else {
    modifiedImageData = await sharp(buffer)
      .greyscale()
      .toBuffer();
  }

  // Envoyer les données de l'image modifiée dans la réponse
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Disposition": "attachment; filename=modifiedImage.jpg",
      "Access-Control-Allow-Origin": "*", // Autoriser l'accès depuis n'importe quelle origine
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type", // Autoriser l'en-tête Content-Type
    },
    body: modifiedImageData.toString("base64"),
    isBase64Encoded: true,
  };
}

function handleOptions(event) {
  return {
    statusCode: 200,
    headers: {
      "access-control-allow-methods": "POST,OPTIONS",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Max-Age": "2592000",
      "Access-Control-Allow-Credentials": "true",
    },
  };
}

module.exports = { handler };
