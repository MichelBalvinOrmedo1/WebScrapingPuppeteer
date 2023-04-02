// Import puppeteer
const puppeteer = require('puppeteer');
const path = require('path');
const websites = require('./websites.json');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  for(const website of websites){
    const scriptPath = path.join(__dirname,'scripts',website.scriptName)
    require(scriptPath)(page, website);
    
  }


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
