const Jimp = require("jimp");

const convertToJPG = async (file) => {

  const image = (await Jimp.read(file)).background(0xFFFFFFFF);
  const resizedImage = image.resize(Jimp.AUTO, 350);
  const buffer = await resizedImage.getBufferAsync(Jimp.MIME_JPEG);

  return buffer;
}

module.exports = { convertToJPG }