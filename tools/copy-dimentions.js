const Jimp = require('jimp');
const path = require('path');
const imgPath = path.resolve(process.cwd(), process.argv[2]);

const getDimentions = async path => {
  try {
    const imagen = await Jimp.read(path);
    const text = `width: ${imagen.bitmap.width}px;\nheight: ${imagen.bitmap.height}px;`
    console.log(text);

  } catch (error) { console.error('Error obtaining image dimensions:', error); }
};

getDimentions(imgPath);