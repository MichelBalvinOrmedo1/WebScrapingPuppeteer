// Import puppeteer

const puppeteer = require('puppeteer');
const websites = require('./websites.json');
(async () => {
 
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();

    await page.goto('https://www.google.com/');
    
    const input = await page.waitForSelector("body > div.L3eUgb");
    await input.type('Pera',{delay:240});

    const buscar = await page.waitForSelector("body > div.L3eUgb");
    await buscar.click();

  
})();
/*
(async() =>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({headless:false});

    const page = await browser.newPage();

    await page.goto('https://elements.envato.com/es/');
    
    await page.screenshot({path: 'amazon1.jpg'})
    const input = await page.$('.DEjNaCG_')
    
    await input.type('pera',{delay:240})
    

  

    // Obtener el elemento del botón
    
  
    // Hacer clic en el botón
    await page.click('.dT9CqtJb');


    
   
    //

})()*/
