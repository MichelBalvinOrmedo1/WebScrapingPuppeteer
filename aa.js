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
    const tituloVideo = document.querySelectorAll('.GsBXsKvH > .u4c2Cda9');
    
    const lstElementos = [];
    tituloVideo.forEach((element, index) => {
      if (index !== 0) {
        lstElementos.push(element.querySelector('ul'));
      }
    });
    
    const jsonData = [];
    
    for (let i = 0; i < trendsList.length; i++) {
      const url = 'https://elements.envato.com';
      const title = trendsList[i].innerHTML;
      const dive = url + trendsList[i].getAttribute('href');
    
      let containerData;
      if (i === 0) {
        let elementAutor = '.trzLbgZD div .Ago_n9Jb a';
        let elementDescrip = '.SZBxAOrq';
        let elementImagen = ' .NgtXrCQY img';
        
        containerData = Array.from(conteiner).map(child => {
          const autor = child.querySelector(elementAutor).innerHTML;
          const autorUrl = url + child.querySelector(elementAutor).getAttribute('href');
          const descripcion = child.querySelector(elementDescrip).getAttribute('aria-label').replace('See more details for ','');
          const descripcionUrl = url + child.querySelector(elementDescrip).getAttribute('href');
          const imagenSrc = child.querySelector(elementImagen).getAttribute('src');
          const imagenSrcset = child.querySelector(elementImagen).getAttribute('srcset');
          
          return {autor: [autor, autorUrl], descripcion: [descripcion, descripcionUrl], imagenSrc, imagenSrcset};
        });
      } else {
        const lista = document.querySelectorAll(`#app > div.Pwa91aRM > main > div > div.GsBXsKvH > div:nth-child(${i + 1}) ul > li div a[data-test-selector="item-card-user-profile-link"]`);
        containerData = Array.from(lista).map(item => item.innerHTML);
      }
    
      const data = {
        "title": [title, dive],
        "container": containerData
      };
      jsonData.push(data);
    }
    
    console.log(JSON.stringify(jsonData, null, 2)); // Muestra el JSON de manera ordenada
    
    
    return jsonData
    
  })
  console.log(jsonData)

  

  //await browser.close();
})();
