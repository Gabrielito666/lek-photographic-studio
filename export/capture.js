const puppeteer = require('puppeteer');
const getExportHtml = require('./getExportHtml');
const path = require('path');

(async () => {
  const { html, exports, id } = await getExportHtml();
  const output = exports ? path.resolve(process.cwd(), exports) : path.resolve(process.cwd(), './output.png');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);
  await page.waitForSelector(`#${id}`);
  const div = await page.$(`#${id}`);
  await div.screenshot({ path: output });
  await browser.close();
  console.log('your image has been successfully exported')
})();