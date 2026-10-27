import { test, expect } from '../fixtures/tests-fixtures';
import { MCALogin } from '../Pages/MCA-Login';
import { orderFlowLocators } from '../Locators/MCA locators';
import { loginData } from '../test-data/logindata';

// Run negative tests without the previously saved login session.
test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});

test.describe('MCA Negative Login Tests', () => {

    test('Login with invalid credentials', async ({ page }) => {
        const mcaLogin = new MCALogin(page);

        await mcaLogin.launchurl();

        await mcaLogin.invalidlogin(
            loginData.invalidUser.invalidemail,
            loginData.invalidUser.invalidpassword
        );

        // Replace this with the actual error message shown by MCA.
        await expect(page.getByText('The email or password entered is incorrect')).toBeVisible({timeout: 10000});
    });

    test('Login with empty credentials', async ({ page }) => {
        const mcaLogin = new MCALogin(page);

        await mcaLogin.launchurl();

        await mcaLogin.emptylogin('', '');

        // Verify that the email field is marked as required.
        await expect(page.locator(orderFlowLocators.signinbutton)).toBeDisabled({timeout: 10000});
    });

});

