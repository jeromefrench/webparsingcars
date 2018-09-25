

console.log("lancement");

const puppeteer = require('/opt/lampp/htdocs/test/node_modules/puppeteer');


//const puppeteer = require('puppeteer');

//(async () => {
const getData = async () => {

//	const browser = await puppeteer.launch({
  //   		headless: false,
    // 		args: ['--no-sandbox', '--disable-setuid-sandbox']
 //		 })

  const browser = await puppeteer.launch({executablePath: '/opt/lampp/htdocs/test/node_modules/puppeteer/.local-chromium/linux-588429/chrome-linux/chrome', headless: true});
  const page = await browser.newPage();
  await page.goto('https://www.autotrader.co.uk/');
	
	await page.waitForSelector('#js-more-options');
	await page.click('#js-more-options');
	//await page.waitFor(2000);
        //await page.waitFor(2000);
await page.waitForSelector('#js-known-search-advanced > div.known-search-container__quick-search-section > div.quick-search-section__dual-container.make-model-selectors > div.select-style.select-style--left.dropdown-image-dual-container.clear-selection > select');

	// 3 - Récupérer les données
  const result = await page.evaluate(() => {
    let title = document.querySelector('#js-known-search-advanced > div.known-search-container__quick-search-section > div.quick-search-section__dual-container.make-model-selectors > div.select-style.select-style--left.dropdown-image-dual-container.clear-selection > select').innerText
    return { title}
  })

  // 4 - Retourner les données (et fermer le navigateur)
  browser.close()
  return result
}

// Appelle la fonction getData() et affichage les données retournées
getData().then(value => {
  console.log(value)
})
