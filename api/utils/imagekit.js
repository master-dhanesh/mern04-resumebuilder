const ImageKit = require("imagekit");
exports.intitImagekit = () => {
    var imagekit = new ImageKit({
        publicKey: process.env.IMAGEKITPUBLICKEY,
        privateKey: process.env.IMAGEKITPRIVATEKEY,
        urlEndpoint: process.env.IMAGEKITURLENDPOINT,
    });
    return imagekit;
};
