import { test, expect, authFile } from "../fixtures/tests-fixtures";
import { Cartpage } from "../Pages/Cartpage";
import { CLPpage } from "../Pages/Clp";
import { PDPpage } from "../Pages/Pdppage";

let cartpage;
// let clp;
let pdp;

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    cartpage = new Cartpage(page);
    // clp = new CLPpage(page);
    pdp = new PDPpage(page);
});

test('addtocart', async () => {
    // await clp.menupage();
    // await clp.selectcategory("Beverages");
    // await clp.selectSubCategory("Gallons To Go");
    // await pdp.verifyproductaddingtocart();

    await cartpage.addduplicatesproducts("Gallons To Go");
    await cartpage.edittheproducts("Gallons To Go","$7.99");
    await cartpage.addpromocode("PsiogMca666");
    // await cartpage.checkoutpage();
});