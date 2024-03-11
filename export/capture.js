const puppeteer = require('puppeteer');
const getExportHtml = require('./getExportHtml');

const puppeteer = require('puppeteer');

(async () => {
  const { html, exports, id } = await getExportHtml();
  const output = exports ? path(process.cwd(), exports) : path(process.cwd(), './output.png');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);
  await page.waitForSelector(`#${id}`);
  const div = await page.$(`#${id}`);
  await div.screenshot({ path: output });
  await browser.close();
})();