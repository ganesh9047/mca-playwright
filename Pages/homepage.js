import { expect } from "@playwright/test";
import { homepagelocators } from "../Locators/MCA homepage";

export class MCAhomepage{
    constructor(page){
        this.page=page;
    }

    async openHeaderNavWithFallback(navLocator, expectedUrlPattern, successLocator = null) {
        const navLink = this.page.locator(navLocator).first();
        await expect(navLink).toBeVisible({ timeout: 20000 });

        const href = await navLink.getAttribute('href');

        await expect(async () => {
            await navLink.click({ timeout: 5000 });

            if (expectedUrlPattern.test(this.page.url())) {
                return;
            }

            if (successLocator && await successLocator.isVisible().catch(() => false)) {
                return;
            }

            // Some UAT builds ignore the first click; fallback to direct href navigation.
            if (href) {
                await this.page.goto(new URL(href, this.page.url()).toString(), {
                    waitUntil: 'domcontentloaded',
                    timeout: 30000
                });
            }

            if (expectedUrlPattern.test(this.page.url())) {
                return;
            }

            if (successLocator) {
                await expect(successLocator).toBeVisible({ timeout: 10000 });
                return;
            }

            await expect(this.page).toHaveURL(expectedUrlPattern, { timeout: 10000 });
        }).toPass({ timeout: 30000 });
    }

    async validatehomepage(){
        await expect(this.page.locator(homepagelocators.profileicon)).toBeVisible({ timeout: 20000 });
    }

    async validateSalutationMessage(expectedName = 'Ganesh'){
        // await this.page.waitForLoadState('domcontentloaded');

        const usernameText = this.page.locator(homepagelocators.usernameText);

        await expect(usernameText).toBeVisible({ timeout: 15000 });
        await expect(usernameText).toHaveText(new RegExp(`^${expectedName}$`, 'i'), { timeout: 15000 });

        return (await usernameText.textContent())?.trim() || '';
    }

    
//     async menupage() {
//     await this.page.locator(homepagelocators.navMenu).click();

//     const expectedUrl = 'https://mca.uat.focusbrands.com/menu/saxton-demo-vendor-721-002';
//     const orderNowButton = this.page.getByText('ORDER NOW', {exact: true});

//     await expect(async () => {
//         const urlMatches = this.page.url() === expectedUrl;
//         const buttonVisible = await orderNowButton.isVisible();

//         expect(urlMatches || buttonVisible).toBe(true);
//     }).toPass({ timeout: 10000 });
// }

    async menupage() {
        await this.openHeaderNavWithFallback(homepagelocators.navMenu, /\/menu(?:\/.*)?$/);
    }


    async rewardspage(){
        const referFriendButton = this.page.getByRole('button', { name: /refer a friend/i }).first();
        await this.openHeaderNavWithFallback(
            homepagelocators.navRewards,
            /\/rewards(?:\/.*)?$/,
            referFriendButton
        );
        await expect(referFriendButton).toBeVisible({ timeout: 20000 });
    }

    async cateringpage(){
        await this.openHeaderNavWithFallback(homepagelocators.navCatering, /\/catering(?:\/.*)?$/);
    }

    async giftcardspage(){
        const sendNowButton = this.page.locator(homepagelocators.sendnow);
        await this.openHeaderNavWithFallback(
            homepagelocators.navGiftCards,
            /\/gift-cards?(?:\/.*)?$/,
            sendNowButton
        );
        await expect(sendNowButton).toBeVisible({ timeout: 60000 });
    }

    async beveragespage(){
        await this.page.locator(homepagelocators.navbeverages).click();
        await this.page.locator(homepagelocators.headerlogo).click();
    }
    
    async locationspage(location, storeName){
        await this.page.locator(homepagelocators.profileicon).click();
        await expect(this.page.locator(homepagelocators.change)).toBeVisible();
        await this.page.locator(homepagelocators.change).click();
        await expect(this.page.locator(homepagelocators.deliverybutton)).toBeVisible();
        await this.page.locator(homepagelocators.deliverybutton).click();
        await this.page.locator(homepagelocators.pickupbutton).click();
        await this.page.locator(homepagelocators.changebuttoninsidelocationpopup).click();
        await expect(this.page.locator(homepagelocators.searchlocationfield)).toBeVisible();
        await this.page.locator(homepagelocators.searchlocationfield).pressSequentially(location, { delay: 150 });

        //Search for Guam Location and saxton store
        const suggestion = this.page.getByRole('button', { name: location, exact: true });
        const storeButton = this.page.getByRole('button', { name: storeName });

        // The list can re-render while loading, so retry the click until the stores list appears
        await expect(async () => {
            if (await storeButton.isVisible()) return;   // stores already loaded, suggestion list is gone
            await suggestion.click({ timeout: 3000 });
            await expect(storeButton).toBeVisible({ timeout: 10000 });
        }).toPass({ timeout: 40000 });

        // Pick the required store from the results list and click its "Order Now"
        const storeCard = this.page.locator('div')
            .filter({ has: storeButton })
            .filter({ has: this.page.locator(homepagelocators.storeOrderNowButton) })
            .last();
        await storeCard.locator(homepagelocators.storeOrderNowButton).click();
        await expect(this.page.locator(homepagelocators.confirmlocation)).toBeVisible({ timeout: 10000 });
        await this.page.locator(homepagelocators.confirmlocation).click();
        await expect(this.page.locator(homepagelocators.profileicon)).toBeVisible({ timeout: 10000 });
    }


    //     // Confirm order type dialog shows the selected store
    //     const dialog = this.page.getByRole('dialog');
    //     await expect(dialog).toContainText(`Pickup at ${storeName}`);
    //     await dialog.getByRole('button', { name: 'Confirm' }).click();
    //     await expect(dialog).toBeHidden();
    // }
}
