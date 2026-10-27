import { expect } from "@playwright/test";
import { checkoutpageLocators } from "../Locators/MCA checkoutpage";
import { waitForDebugger } from "node:inspector";

export class Checkoutpage {
    constructor(page){this.page=page;}


async checkoutpage() {

await this.page.locator(checkoutpageLocators.addtocartbutton).click();
await this.page.locator(checkoutpageLocators.checkoutbutton).click();
await expect(
    this.page.getByRole('link', { name: 'Change' })
).toBeVisible({ timeout: 30000 });

const giftCard = this.page.locator(checkoutpageLocators.giftCard);
const selectedGiftCard = giftCard.filter({hasText: 'Ending in 0039'});
const checkbox = selectedGiftCard.getByRole('checkbox');

await checkbox.check();
await expect(checkbox).toBeChecked();
}

async placeorder(){
    await expect(this.page.getByRole('button', { name: 'Place Order' })).toBeVisible({ timeout: 30000 });
    await this.page.getByRole('button', { name: 'Place Order' }).click();
   const callRestaurantButton = this.page.locator(checkoutpageLocators.callrestuarantbutton);
   const closeButton = this.page.getByRole('button', { name: 'Close', exact: true });
   if (await callRestaurantButton.isVisible()) {
    console.log('Call Restaurant button is visible.');

} else if (await closeButton.isVisible()) {
    console.log('Close button is visible.');

    await closeButton.click();

} else {
    console.log('Neither button is visible.');
}
}}