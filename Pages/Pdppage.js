import { expect } from "@playwright/test";
import {pdplocators} from "../Locators/MCA Pdppage";
import { CLPpage } from "./Clp";
import { clplocators } from "../Locators/MCA CLPpage";
import { cartpagelocators } from "../Locators/MCA Cartpage";

export class PDPpage{
    constructor(page) {
        this.page = page;
    }
async verifypdp(subcategory){
await expect(this.page.locator(pdplocators.producttitle)).toHaveText(subcategory, { timeout: 30000 });
}

async verifyproductprice(expectedprice){
await expect(this.page.locator(pdplocators.productprice)).toHaveText(expectedprice, { timeout: 30000 });
}

async verifyproductpricewithmodifers(modifiedprice){

    // const modifier = this.page.getByText('Lemonade Gallon', { exact: true });
    // // await modifier.scrollIntoViewIfNeeded();
    // await modifier.check();
    // await expect(this.page.locator(pdplocators.productprice)).toHaveText(modifiedprice, { timeout: 30000 });
    const modifier = this.page.getByRole('radio', {name: 'Lemonade Gallon 2290 cal'});
    // const modifier = this.page.getByRole('radio', {name: 'Gallon Lemonade 2290 cal'});
    await modifier.dispatchEvent('click');
    await expect(modifier).toBeChecked();
    await expect(this.page.locator(pdplocators.productprice)).toHaveText(modifiedprice, { timeout: 30000 });
}

async verifypricewithaddons(expectedprice){
    // const addon = this.page.getByRole('checkbox', {name: 'Strawberry 150 cal'});
    const addon = this.page.getByRole('checkbox', {name: 'Strawberry 150 cal'});
    await addon.dispatchEvent('click');
    await expect(addon).toBeChecked();
    await expect(this.page.locator(pdplocators.productprice)).toHaveText(expectedprice, { timeout: 30000 });
}


async verifyproductaddingtocart(){
    await this.page.locator(pdplocators.addtocartbutton).click();
    await expect(this.page.locator(clplocators.navMenu)).toBeVisible({ timeout: 30000 });
    await expect(this.page.getByTestId('link_cart').locator('span')).toHaveText('1', { timeout: 30000 });
    // await expect(this.page.getByText('Item added to cart')).toBeVisible({ timeout: 30000 });
    // const cartItem = this.page.getByRole('listitem', {name: 'Lemonade Gallon 2290 cal'});
    // await expect(cartItem).toBeVisible();
}

async verifyproductaddedtocart(productname){
    const product = this.page.getByText(productname, { exact: true });
    await expect(product).toBeVisible({ timeout: 30000 });
}
} 