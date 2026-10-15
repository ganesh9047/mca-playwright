import fs from 'fs';
import path from 'path';
import { test, expect, authFile } from '../fixtures/tests-fixtures';
import { loginData } from '../test-data/logindata';
import { homepagelocators } from '../Locators/MCA homepage';
import { Cartpage } from '../Pages/Cartpage';

test('MCA Login', async ({ page, mcaLogin }) => {

    test.setTimeout(60 * 1000);

    await mcaLogin.login(
        loginData.validUser.email,
        loginData.validUser.password
    );
    await expect(page.locator(homepagelocators.profileicon)).toBeVisible({ timeout: 30 * 1000 });
    const cartpage = new Cartpage(page);
    await cartpage.clearExistingCart();

    await expect(page.locator(homepagelocators.profileicon)).toBeVisible({ timeout: 30 * 1000 });

    // Save the session so Testhomepage.spec.js can reuse it without logging in again.
    fs.mkdirSync(path.dirname(authFile), { recursive: true });
    await page.context().storageState({ path: authFile });

});
