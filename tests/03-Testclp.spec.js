import { test } from "../fixtures/tests-fixtures";
import { CLPpage } from "../Pages/Clp";

let clp;

test.setTimeout(90000);

test.beforeEach(async ({ page }) => {
	await page.goto('/');
	clp = new CLPpage(page);
});

test('CLP page is accessible from menu', async () => {
	await clp.menupage();
});

test('select a category on the menu page', async () => {
	await clp.menupage();
	await clp.selectcategory("Beverages");
    await clp.selectSubCategory("Gallons To Go");
});
