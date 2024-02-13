const sharp = require("sharp");

exports.handler = async (event) => {
    

        // Vérifier si la méthode HTTP est OPTIONS
        if (event.httpMethod === "OPTIONS") {
            console.log('options')
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*", // Autoriser l'accès depuis n'importe quelle origine
                    "Access-Control-Allow-Methods": "POST",
                    "Access-Control-Allow-Headers": "Content-Type",

                },
                body: JSON.stringify({ message: "OPTIONS request handled" })
            };
        }
        console.log(event.httpMethod)
        // Vérifier si la méthode HTTP est POST
        if (event.httpMethod === "POST") {
            // Vérifier si le corps de la requête est vide
            console.log('post')
            if (!event.body) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: "Empty request body" })
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
                    "Access-Control-Allow-Methods": "POST"
                },
                body: modifiedImageData.toString("base64"),
                isBase64Encoded: true
            };
        } else {
            // Si la méthode HTTP n'est ni OPTIONS ni POST, renvoyer une erreur
            return {
                statusCode: 405, // Méthode non autorisée
                body: JSON.stringify({ error: "Method Not Allowed" })
            };
        }
  
};
