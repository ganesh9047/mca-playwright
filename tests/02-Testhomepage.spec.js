import { test, expect, authFile } from "../fixtures/tests-fixtures";
import { MCAhomepage } from "../Pages/homepage";

// One browser window for all tests, started from the session saved by Testmcalogin.spec.js.
// test.describe.configure({ mode: 'serial' });

// let context;
// let homepage;

// test.beforeAll(async ({ browser }) => {
// 	context = await browser.newContext({ storageState: authFile });
// 	const page = await context.newPage();
// 	await page.goto('/');
// 	homepage = new MCAhomepage(page);
// });

// test.beforeEach(async () => {
// 	await homepage.page.goto('/');
// });

// test.afterAll(async () => {
// 	await context.close();
// });

// Start every test already logged in, using the session saved by Testmcalogin.spec.js.
// test.use({ storageState: authFile });

let homepage;

test.beforeEach(async ({ page }) => {
    await page.goto('/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    homepage = new MCAhomepage(page);
});

test('homepage overview and salutation', async () => {
	await homepage.validatehomepage();

	const salutationName = await homepage.validateSalutationMessage('Ganesh');
	await expect(salutationName).toBe('Ganesh');
});

test('menu page is accessible', async () => {
	await homepage.menupage();
});

test('rewards page is accessible from homepage', async () => {
	await homepage.rewardspage();
});

test('catering page is accessible from homepage', async () => {
	await homepage.cateringpage();
});

test('gift cards page is accessible from homepage', async () => {
	await homepage.giftcardspage();
});

test('beverages page is accessible from homepage', async () => {
	await homepage.beveragespage();
});

test("filllocation", async() => {
	test.setTimeout(90000);

	// roswell store
	// await homepage.locationspage("Roswell, GA, USA", "1555 Holcomb Bridge Rd");

	// Saxton store
	await homepage.locationspage("Guam", "Saxton Demo Vendor (721)");

	})
