const sharp = require("sharp");

exports.handler = async (event, context) => {
    try {
        
        
        // Vérifier si la méthode HTTP est POST
        if (event.httpMethod === "POST") {
            const { imageData, mirrorX, mirrorY } = JSON.parse(event.body);
            console.log("x:" + mirrorX);
            console.log("y:" + mirrorY);

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
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: "Internal Server Error" })
        };
    }
};
