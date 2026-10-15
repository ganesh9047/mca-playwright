import { test, expect, authFile } from "../fixtures/tests-fixtures";
import { Cartpage } from "../Pages/Cartpage";

let cartpage;

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    cartpage = new Cartpage(page);
});

test('addtocart', async () => {
    await cartpage.addduplicatesproducts("Gallons To Go");
    await cartpage.edittheproducts("Gallons To Go","$7.99");
    await cartpage.addpromocode("PsiogMca666");
    await cartpage.checkoutpage();
});