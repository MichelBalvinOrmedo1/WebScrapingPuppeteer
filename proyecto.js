const puppeteer = require('puppeteer');
const websites = require('./websites.json');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://elements.envato.com/es/');
  const input = await page.waitForSelector('#autosuggest');
  await input.type('pera', { delay: 250 });
  const button = await page.waitForSelector('#app > div.Pwa91aRM > main > div > div > div.tt9Ej34g > div.S51DHinX > div > div > div > form > button');
  await button.click();

  // Esperar a que la página termine de cargar
  await page.waitForSelector('.GsBXsKvH .u4c2Cda9');

  const producto = await page.$$('.GsBXsKvH .u4c2Cda9');
  
  console.log(producto);

  //await browser.close();
})();