console.log(process.argv);

console.log("lancement de lapp");
console.log("first argument  ");
console.log(process.argv[2]);
console.log("second argument   ");
console.log(process.argv[3]);

var valuemodel = process.argv[3].match(/[a-z0-9]+/i);
console.log("le value model");
console.log(typeof valuemodel);
console.log(valuemodel[0]);



const puppeteer = require('/opt/lampp/htdocs/test/node_modules/puppeteer');

const getData = async () => {

//console.log('fonction');

 	const browser = await puppeteer.launch({executablePath: '/opt/lampp/htdocs/test/node_modules/puppeteer/.local-chromium/linux-588429/chrome-linux/chrome', headless: true});
  	const page = await browser.newPage();
 	await page.goto('https://www.autotrader.co.uk/');

//console.log('fonction 2');
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

page.waitFor(3000);
await page.select('#js-known-search-advanced > div.known-search-container__quick-search-section > div.quick-search-section__dual-container.make-model-selectors > div:nth-child(2) > select',valuemodel[0]);




console.log('100101010101');


await Promise.all([
      page.click("#js-known-search-advanced > div.known-search-container__left-search-section > button"),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
]);

console.log('1212121212');


await page.waitForSelector('#main-content > div.js-search-results > ul');
console.log('111111111111111');

  const resultbis = await page.evaluate(() => {
	  console.log('2222222222222222');
    var titlebis = document.querySelector('#main-content > div.js-search-results > ul').innerHTML;
   console.log("33333333333333333");
	  console.log (titlebis);
	  return { titlebis}
 });



	console.log("TTTTTTTTTTTTTTTTTEEEEEEEEESSSSSSSSSSSSSSSSTTTTTTTTTTTTTT")
console.log(resultbis.titlebis);
//	console.log("TTTTTTTTTTTTTTTTTEEEEEEEEESSSSSSSSSSSSSSSSTTTTTTTTTTTTTT")
  // 4 - Retourner les données (et fermer le navigateur)
browser.close()
//	console.log("FIN")
}

// Appelle la fonction getData() et affichage les données retournées
getData();


