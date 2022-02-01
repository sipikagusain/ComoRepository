
const nestApiUrl = 'http://localhost:3890/social-blade';

async function InsertSocialBladeData(browser, userAgent, data) {
    console.log("The insertion process has been started");
    let socialBladeData = [];
    data.forEach(element => {
         let val = element.toString().split("\n");
         socialBladeData.push(
              {
                   "id": Math.floor(Math.random() * (99999 - 0) + 0),
                   "Rank": val[0],
                   "Grade": val[1],
                   "DisplayName": val[2],
                   "Videos": val[3],
                   "Subscriber": val[4],
                   "Views": val[5]
              });
    });

    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.setRequestInterception(true);

    page.once('request', request => {
         request.continue({
              method: 'POST', 'headers': {
                   ...request.headers(),
                   'Content-Type': 'application/x-www-form-urlencoded'
              }, postData: JSON.stringify(socialBladeData)
         });
    });

    const response = await page.goto(nestApiUrl);

    console.log("The data has been scrapped.");
    console.log({
         url: response.url(),
         statusCode: response.status(),
         body: await response.text()
    });
}

module.exports = {InsertSocialBladeData}