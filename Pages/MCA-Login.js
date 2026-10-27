
import { expect } from "@playwright/test";
import { orderFlowLocators } from "../Locators/MCA locators";

export class MCALogin {
    constructor(page) {
        this.page = page;
    }

    // Navigate to the MCA application.
    async launchurl() {
        await this.page.goto('/', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
    }

    // Open the login form and wait for the login fields.
    async openLoginForm() {
        const headerSignIn = this.page.locator(
            orderFlowLocators.headersigninbutton
        );

        const welcomeSignIn = this.page.locator(
            orderFlowLocators.welcomesigninbutton
        );

        const email = this.page.locator(
            orderFlowLocators.email
        );

        const finalSignIn = this.page.locator(
            orderFlowLocators.signinbutton
        );

        // Retry the login-form transition if the page is slow.
        await expect(async () => {

            // If the final Sign In button is already visible,
            // the login form is open.
            if (await finalSignIn.isVisible()) {
                await expect(email).toBeVisible();
                return;
            }

            // Open the welcome screen if it is not visible.
            if (!(await welcomeSignIn.isVisible())) {
                await headerSignIn.click({ timeout: 5000 });
            }

            // Click the welcome screen's Sign In button
            // only when it is visible.
            if (await welcomeSignIn.isVisible()) {
                await welcomeSignIn.click({ timeout: 5000 });
            }

            // Verify that the login form has opened.
            await expect(email).toBeVisible({
                timeout: 8000
            });

            await expect(finalSignIn).toBeVisible({
                timeout: 8000
            });

        }).toPass({ timeout: 60000 });
    }

    // Enter credentials and submit the login form.
    // Works for valid
    async login(emailid, password) {
        await this.openLoginForm();

        await this.page
        .locator(orderFlowLocators.email)
        .fill(emailid);

        await this.page
        .locator(orderFlowLocators.password)
        .fill(password);

        await this.page
        .locator(orderFlowLocators.signinbutton)
        .click();
        
    }

    
    async invalidlogin(invalidemail, invalidpassword) {
        await this.openLoginForm();

         await this.page
        .locator(orderFlowLocators.email)
        .fill(invalidemail);

        await this.page
        .locator(orderFlowLocators.password)
        .fill(invalidpassword);

        await this.page
        .locator(orderFlowLocators.signinbutton)
        .click();
    }

    async emptylogin(emptyemail, emptypassword) {
        await this.openLoginForm();

        await this.page
        .locator(orderFlowLocators.email)
        .fill(emptyemail);

        await this.page
        .locator(orderFlowLocators.password)
        .fill(emptypassword);

        await this.page
        .locator(orderFlowLocators.signinbutton)
        .click();
    }


}