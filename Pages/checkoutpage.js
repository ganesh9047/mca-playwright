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
}