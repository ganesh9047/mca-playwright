import { test } from "../fixtures/tests-fixtures";
import { CLPpage } from "../Pages/Clp";
import { PDPpage } from "../Pages/Pdppage";

let clp;
let pdp;

test.setTimeout(90000);

test.beforeEach(async ({ page }) => {
	await page.goto('/');
	clp = new CLPpage(page);
	pdp = new PDPpage(page);
});

test('PDP page opens from a subcategory', async () => {
	await clp.menupage();
	await clp.selectcategory("Beverages");
	await clp.selectSubCategory("Gallons To Go");
	await pdp.verifypdp("Gallons To Go");
    await pdp.verifyproductprice("$7.99");
    await pdp.verifyproductpricewithmodifers("$9.99");
    await pdp.verifypricewithaddons("$12.99");
    await pdp.verifyproductaddingtocart();
	// await pdp.verifyproductaddedtocart("Gallons To Go");
});
