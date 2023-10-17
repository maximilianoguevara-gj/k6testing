import { browser } from 'k6/experimental/browser';
import { check } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    browser: {
      executor: 'constant-vus',
      exec: 'browserTest',
      vus: 20,
      duration: '5m',
      options: {
        browser: {
          type: 'chromium',
          args: ['no-sandbox'],
        }
      }
    },
    news: {
      executor: 'constant-vus',
      exec: 'news',
      vus: 20,
      duration: '5m',
    }
  }
};

export async function browserTest() {
  const page = browser.newPage();

  try {
    await page.goto('https://live.gojiraf.com/store/64ea016f2d4eb90012f53913?utm_source=slug_gojiraf&utm_medium=social_sharing_Meli&utm_campaign=MELI');

    const button = page.locator('#like-button');
    await button.click()

    
  } finally {
    page.close();
  }
}

export function news() {
  const res = http.get('https://live.gojiraf.com/store/64ea016f2d4eb90012f53913?utm_source=slug_gojiraf&utm_medium=social_sharing_Meli&utm_campaign=MELI');
  const button = page.locator('#like-button');
  check(res, {
    'status is 200': (r) => r.status === 200,
    
  });
}