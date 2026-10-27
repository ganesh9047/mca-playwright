import { test, expect, authFile } from "../fixtures/tests-fixtures";
import { Checkoutpage } from "../Pages/checkoutpage";

let checkoutpage;

test.beforeEach(async ({ page }) => {
     await page.goto('/', { waitUntil: 'domcontentloaded' });
    checkoutpage = new Checkoutpage(page);
});

test('checkoutpage', async () => {
    await checkoutpage.checkoutpage();
    await checkoutpage.placeorder();
    });