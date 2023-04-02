module.exports = async (page, website)=>{
    // Se define una función asíncrona que toma dos argumentos: "page" y "website".
    const {selectors} = website;
    // Se desestructura la variable "website" para obtener la propiedad "selectors", que se asigna a la variable "selectors".

    await page.goto(website.url);
    // Se navega a la URL especificada en el objeto "website".
    await page.waitForSelector(selectors.trendsMenu);
    // Se espera a que el selector especificado en "selectors.trendsMenu" esté presente en la página.
    await page.click(selectors.trendsMenu)
    // Se hace clic en el selector especificado en "selectors.trendsMenu".
    await page.waitForSelector(selectors.trendsLink);
    // Se espera a que el selector especificado en "selectors.trendsLink" esté presente en la página.
    await page.click(selectors.trendsLink)
    // Se hace clic en el selector especificado en "selectors.trendsLink".
    await page.waitForSelector(selectors.trendListTag);
    // Se espera a que el selector especificado en "selectors.trendListTag" esté presente en la página.

    const trendsText = await page.evaluate((trendsListTag)=>{
        // Se llama a la función "evaluate" de Puppeteer para ejecutar código JavaScript en el contexto de la página web.
        const trendsList = document.querySelectorAll(trendsListTag);
        // Se seleccionan todos los elementos que coinciden con el selector especificado en "trendsListTag".
        const trendsText = [];
        // Se crea un array vacío "trendsText" para almacenar los textos de los elementos seleccionados.
        for (const trend of trendsList){
            // Se itera sobre cada elemento en "trendsList".
            trendsText.push(trend.innerText)
            // Se agrega el texto del elemento actual al array "trendsText".
        }
        return trendsText;
        // Se devuelve el array "trendsText".
    },selectors.trendListTag);
    // Se pasan dos argumentos a la función "evaluate": una función que se ejecutará en la página web y el selector para obtener los elementos.

    const regExp = new RegExp('[A-z]+');
    // Se crea una expresión regular que busca letras de la A a la Z en mayúsculas y minúsculas en el texto.

    for(const text of trendsText){
        // Se itera sobre cada elemento del array "trendsText".
        const textSplited = text.split('\n').filter((txt) => regExp.test(txt));
        // Se divide el texto en varias líneas y se filtra solo las líneas que contienen letras de la A a la Z.
        console.log(textSplited);
        // Se imprime cada línea filtrada en la consola.
    }
};
