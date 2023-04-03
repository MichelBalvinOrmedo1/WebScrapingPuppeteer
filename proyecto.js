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

 

  const matrix = await page.evaluate(()=>{
    const trendsList = document.querySelectorAll('.GsBXsKvH > .u4c2Cda9 div h3 a');
    
    
    const trendsText = [];
    for (const trend of trendsList) {
      trendsText.push(trend.innerHTML);
    }
    
    const dives = [];
    for (const dive of trendsList) {
      dives.push('https://elements.envato.com'+dive.getAttribute('href'));
    }
    
    const matrix = [];
    for (let i = 0; i < trendsText.length; i++) {
      matrix.push([trendsText[i], dives[i]]);
    }
    
    return matrix;
    
  })
  console.log(matrix);
  

  //await browser.close();
})();