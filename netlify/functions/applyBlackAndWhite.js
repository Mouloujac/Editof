const sharp = require("sharp");

exports.handler = async (event, context) => {
    try {
        
        
        const { imageData, mirrorX, mirrorY } = JSON.parse(event.body);
        console.log("x:" + mirrorX);
        console.log("y:" + mirrorY);
        
        // Decode base64 image data
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
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST" // Autoriser l'accès depuis n'importe quelle origine
            },
            body: modifiedImageData.toString("base64"),
            isBase64Encoded: true
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: "Internal Server Error" })
        };
    }
};
