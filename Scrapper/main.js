const puppeteer = require('puppeteer');
const { InsertSocialBladeData } = require('./socialBladeInsertRepo');
const { GetSocialBladeData } = require('./socialBladeScrapper');

const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';

(async () => {
     try {
          const browser = await puppeteer.launch({
               headless: true,
               args: ["--disable-setuid-sandbox, --start-maximized"],
               'ignoreHTTPSErrors': true,
          });

          const data = await GetSocialBladeData(browser, userAgent);
          await InsertSocialBladeData(browser, userAgent, data);
          await browser.close();
     }
     catch (error) {
          console.log("An Exception has occurred !. Try again after some time" + error);
     }

})();

