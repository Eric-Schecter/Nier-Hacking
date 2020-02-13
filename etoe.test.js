const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: false,
    args: ['--start-fullscreen']
  }
  const nomarl_mode = {
    headless: false,
    args: ['--start-fullscreen']
  }
  return process.env.NODE_ENV = 'debug' ? debugging_mode : nomarl_mode;
}

let browser;
let page;
let pagePhone;
const errors = [];
beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging());
  page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 780 })
  await page.goto('http://localhost:32000')

  page.on('pageerror', e => errors.push(e.text))
  // await page.setRequestInterception(true);
  // page.on('request', intersectedRequest => {
  //   if(intersectedRequest.url.includes('localhost')){
  //     intersectedRequest.abort();
  //   }else{
  //     intersectedRequest.continue();
  //   }
  // })
  // await page.waitFor(3000)
  // page.setViewport({ width: 500, height: 2400 })
})

// describe('on page load', () => {
//   test('click all cards then reset', async () => {
//     const res = new Map();
//     let count = 0;
//     for (let i = 0; i < 12; i++) {
//       count++;
//       await page.click(`[data-testid="card${i}"]`)
//       const attr = await page.$$eval(`[data-testid="card${i}"]`, el => el[0].children[0].getAttribute('src'));
//       if (res.has(attr)) {
//         if (count % 2 === 1) {
//           await page.click(`[data-testid="card${res.get(attr)}"]`)
//         } else if (res.has(attr) !== i - 1) {
//           await page.waitFor(2000)
//           await page.click(`[data-testid="card${i}"]`)
//           await page.click(`[data-testid="card${res.get(attr)}"]`)
//         }
//       } else {
//         res.set(attr, i);
//       }
//     }
//     await page.waitFor(2000)
//     await page.click('[data-testid="reset"]')
//     await page.waitFor(2000)
//     await page.close();
//   }, 55000)
// })

// describe('on page load for phone', () => {
//   test('click all cards then reset', async () => {

//   }, 55000)
// })

describe('no error', () => {
  test('does not have errors', async () => {
    if (errors.length) {
      await page.screenshot({ path: 'screenshot/error.png' });
    }
    expect(errors.length).toBe(0);
  })
})

afterAll(() => {
  browser.close();
})