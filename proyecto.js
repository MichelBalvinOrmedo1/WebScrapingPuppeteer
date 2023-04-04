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
    const conteiner = document.querySelectorAll('.tXwhn5Zg div[data-test-selector="photogrid-photo"]');
    const tituloVideo = document.querySelectorAll('.GsBXsKvH  > .u4c2Cda9  ul li a');
    
    const jsonData = [];
    
    for (let i = 0; i < trendsList.length; i++) {
      const url = 'https://elements.envato.com';
      const title = trendsList[i].innerHTML;
      const dive = url + trendsList[i].getAttribute('href');
    
      let containerData;
      if (i === 0) {
        
       /* ,descripcion:[child.getAttribute('aria-label').replace('See more details for ',''),'https://elements.envato.com' +child.getAttribute('href')] */
       let elementAutor = '.trzLbgZD div .Ago_n9Jb a';
       let elementDescrip = '.SZBxAOrq';
       let elementImagen = ' .NgtXrCQY img';
        containerData = Array.from(conteiner).map(child => [
            {autor: [child.querySelector(elementAutor).innerHTML,
              url + child.querySelector(elementAutor).getAttribute('href')],

            descripcion:[child.querySelector(elementDescrip).getAttribute('aria-label').replace('See more details for ',''),
                        url +child.querySelector(elementDescrip).getAttribute('href'),
                      child.querySelector(elementImagen).getAttribute('src'),
                    child.querySelector(elementImagen).getAttribute('srcset')]}]
          );

       
      } else {
        containerData = Array.from(tituloVideo).map(item => [
          item.textContent.trim(),
          item.href,
          item.querySelector('div[title="Author"]')?.getAttribute('title') || '',
          item.querySelector('div[title="Author"] a')?.href || '',
        ]);
      }
    
      const data = {
        "title": [title, dive],
        "container": containerData
      };
    
      jsonData.push(data);
    }
    
    return jsonData;
    
    
    
    
  })
  console.log(jsonData);
  console.log(jsonData[0].container[0])
  

  //await browser.close();
})();