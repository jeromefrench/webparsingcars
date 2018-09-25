//console.log(process.argv);

//console.log("lancement");
//console.log(process.argv[2]);



const puppeteer = require('/opt/lampp/htdocs/test/node_modules/puppeteer');

const getData = async () => {

 	const browser = await puppeteer.launch({executablePath: '/opt/lampp/htdocs/test/node_modules/puppeteer/.local-chromium/linux-588429/chrome-linux/chrome', headless: true});
  	const page = await browser.newPage();
 	await page.goto('https://www.autotrader.co.uk/');

        await page.waitForSelector('#js-more-options');
        await page.click('#js-more-options');
await page.waitForSelector('#js-known-search-advanced > div.known-search-container__quick-search-section > div.quick-search-section__dual-container.make-model-selectors > div.select-style.select-style--left.dropdown-image-dual-container.clear-selection > select');








       // 3 - Récupérer les données
  const result = await page.evaluate(() => {
    var title = document.querySelector('#js-known-search-advanced > div.known-search-container__quick-search-section > div.quick-search-section__dual-container.make-model-selectors > div.select-style.select-style--left.dropdown-image-dual-container.clear-selection > select').innerHTML
  // console.log("AAAAAAAAAAAAAA");
	  return { title}
 });

	var str = result.title;




//console.log( typeof str  );
//console.log( str );



//console.log("AAAAAAAAAAAAAAAA");
	var tab = str.match(/="(.*?)">/g);
//	console.log(tab);
//	console.log(typeof tab)

//console.log("BBBBBBBBBBBBBBBBB");
	var tabbis = String(tab).match(/[A-Z\s]+/g);
//	console.log(tabbis);
//	console.log("CCCCCCCCCCCCCCCCCCCC");
//	console.log(tabbis[process.argv[2]-1]);


await page.select('#js-known-search-advanced > div.known-search-container__quick-search-section > div.quick-search-section__dual-container.make-model-selectors > div.select-style.select-style--left.dropdown-image-dual-container.clear-selection > select', tabbis[process.argv[2]-1])




// 3 - Récupérer les données
await page.click('#js-known-search-advanced > div.known-search-container__quick-search-section > div.quick-search-section__dual-container.quick-search-section__location-container > input');
	await page.keyboard.type('HR68SB');

await page.click('#js-known-search-advanced > div.known-search-container__quick-search-section > div.quick-search-section__dual-container.make-model-selectors > div.select-style.select-style--left.dropdown-image-dual-container.clear-selection > select');

        await page.waitForSelector('#js-known-search-advanced > div.known-search-container__quick-search-section > div.quick-search-section__dual-container.make-model-selectors > div:nth-child(2) > select');

	
  const resultbis = await page.evaluate(() => {
    var titlebis = document.querySelector('#js-known-search-advanced > div.known-search-container__quick-search-section > div.quick-search-section__dual-container.make-model-selectors > div:nth-child(2) > select').innerText
  // console.log("AAAAAAAAAAAAAA");
	  return { titlebis}
 });

//	console.log("TTTTTTTTTTTTTTTTTEEEEEEEEESSSSSSSSSSSSSSSSTTTTTTTTTTTTTT")
console.log(resultbis.titlebis);
//	console.log("TTTTTTTTTTTTTTTTTEEEEEEEEESSSSSSSSSSSSSSSSTTTTTTTTTTTTTT")
  // 4 - Retourner les données (et fermer le navigateur)
browser.close()
//	console.log("FIN")
}

// Appelle la fonction getData() et affichage les données retournées
getData();



