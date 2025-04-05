const sharp = require("sharp");

async function compressImage(imageBuffer) {
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();
  const quality = metadata.channels > 3 ? 80 : 70;
  const compressedBuffer = await image
    .resize({
      width: 1920,
      height: 1080,
      fit: "inside",
    })
    .webp({ quality })
    .toBuffer();
  return compressedBuffer;
}

async function compressImages(imageBuffers) {
  const promises = imageBuffers.map((buffer) => compressImage(buffer));
  return Promise.all(promises);
}

module.exports = { compressImage, compressImages };
