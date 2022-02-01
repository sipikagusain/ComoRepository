const socialBladeUrl = 'https://socialblade.com/youtube/';

async function GetSocialBladeData(browser, userAgent) {
    console.log("The data scrapping process has been started");
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.goto(socialBladeUrl);

    await page.evaluate(() => {
         let domElement = document.querySelector('.table-body');
         domElement.scrollTop = domElement.scrollHeight;
    });

    await page.waitForSelector('.table-body');

    const data = await page.evaluate(() => {
         //const tds = document.querySelectorAll('.table-body')
         const tds = Array.from(document.querySelectorAll('.table-body'));
         return tds.map(td => td.innerText);
    });

    console.log("The data has been scrapped");
    return data;
}

module.exports = {GetSocialBladeData}