require('dotenv').config();
const puppeteer = require('puppeteer');
const delay = require('delay');

const { ACCOUNT, PASSWORD, ADMIN_DOMAIN, CONSOLE_DOMAIN } = process.env;
if (!ADMIN_DOMAIN || !CONSOLE_DOMAIN) {
  throw Error('❌   Please create a .env file.');
}

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 20,
  });
  page = await browser.newPage();
  // await page.setViewport({ width: 1400, height: 1000 });
});

afterAll(() => {
  browser.close();
});

describe(
  'Admin',
  () => {
    it('[Admin] Login', async () => {
      await page.goto(`${ADMIN_DOMAIN}/admin/login?locale=en`);
      await page.type('input[name=email]', ACCOUNT);
      await page.type('input[name=password]', PASSWORD);
      await page.click('input[type=submit]');
      await page.waitForNavigation();
      expect(page.url()).toContain('/admin');
    });

    it('[Admin] Start service', async () => {
      const getStatus = p =>
        p.$eval(
          '#root > div > div > div > header > div > div > p',
          el => el.innerHTML,
        );
      const status = await getStatus(page);
      await delay(500);
      if (['Start', '啟動'].includes(status)) {
        await page.click('#root > div > div > div > header > div');
      }
      const newStatus = await getStatus(page);
      await delay(500);
      expect(['Start', '啟動'].includes(newStatus)).toBeFalsy();
    });

    it(
      '[Console] Login',
      async () => {
        await page.goto(`${CONSOLE_DOMAIN}/login?locale=en`);
        await page.type('input[name=email]', ACCOUNT);
        await page.type('input[name=password]', PASSWORD);
        await page.click('button[type=submit]');
        await page.waitForNavigation();
        await delay(500);
        expect(page.url()).toContain('/dashboard');
      },
      5000,
    );

    it('[Prototype] Open create dialog', async () => {
      await page.goto(`${CONSOLE_DOMAIN}/prototypes?locale=en`);
      await page.waitForSelector('button[type=submit]');
      await page.click('button[type=submit]');
      await page.waitForSelector('div[role=dialog]');
    });

    it('[Prototype] Create', async () => {
      await page.type(
        'input[id=prototype_name]',
        `Puppeteer Title ${new Date()}`,
      );
      await page.click(
        'div[role=dialog] div > div:nth-child(3) button:nth-child(2)',
      );
    });
  },
  999999999,
);
