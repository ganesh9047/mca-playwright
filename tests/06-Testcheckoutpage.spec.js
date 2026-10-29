import { test, expect, authFile } from "../fixtures/tests-fixtures";
import { Checkoutpage } from "../Pages/checkoutpage";

let checkoutpage;

test.beforeEach(async ({ page }) => {
     test.setTimeout(60000);
     await page.goto('/', { waitUntil: 'commit',
        timeout: 45000
      });
    checkoutpage = new Checkoutpage(page);
});

test('checkoutpage', async () => {
    await checkoutpage.checkoutpage();
    await checkoutpage.placeorder();
    });