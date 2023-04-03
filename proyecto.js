const puppeteer = require('puppeteer');


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

 

  const jsonData = await page.evaluate(()=>{
    const trendsList = document.querySelectorAll('.GsBXsKvH > .u4c2Cda9 div h3 a');
    const jsonData = [];

    for (let i = 0; i < trendsList.length; i++) {
      const title = trendsList[i].innerHTML;
      const dive = 'https://elements.envato.com' + trendsList[i].getAttribute('href');
    
    
      const data = {
        "title": [title, dive],
        "contenedores": [["title", "creator", "linkDescarga"],["title", "creator", "linkDescarga"]]
      };
    
      jsonData.push(data);
    }
    
    return jsonData;
    
    
  })
  console.log(jsonData);
  

  //await browser.close();
})();