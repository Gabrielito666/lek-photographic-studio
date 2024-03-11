const fs = require('fs').promises;
const { JSDOM } = require('jsdom');

const convertImageToBase64 = async filePath =>
{
    try {
        const data = await fs.readFile(filePath);
        return Buffer.from(data).toString('base64');
    } catch (error) {
        console.error('Error img convert to base64:', error);
        throw error;
    }
}

const htmlImagesToBase64 = async htmlString =>
{
    const dom = new JSDOM(htmlString);
    const document = dom.window.document;
    const images = document.querySelectorAll('img');

    for (let img of images) {
        const src = img.getAttribute('src');
        const imagePath = `./${src}`;
        try {
            const imageBase64 = await convertImageToBase64(imagePath);
            const mimeType = src.split('.').pop();
            img.setAttribute('src', `data:image/${mimeType};base64,${imageBase64}`);
        } catch (error) {
            console.error('Error to process images:', src, error);
        }
    }
    return dom.serialize();
}
module.exports = htmlImagesToBase64;