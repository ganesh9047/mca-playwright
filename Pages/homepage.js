import { expect } from "@playwright/test";
import { homepagelocators } from "../Locators/MCA homepage";

export class MCAhomepage{
    constructor(page){
        this.page=page;
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

    async menupage(){
        await this.page.locator(homepagelocators.navMenu).click();
        await expect(this.page.locator(homepagelocators.ordernowbutton)).toBeVisible();
    }

    async rewardspage(){
        await this.page.locator(homepagelocators.navRewards).click();
        await expect(this.page.locator(homepagelocators.referafriend)).toBeVisible();   
    }

    async cateringpage(){
        await this.page.locator(homepagelocators.navCatering).click();
    }

    async giftcardspage(){
        await this.page.locator(homepagelocators.navGiftCards).click();
        await expect(this.page.locator(homepagelocators.sendnow)).toBeVisible();
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
