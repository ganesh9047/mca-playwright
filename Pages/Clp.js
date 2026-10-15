import { expect } from "@playwright/test";
import{clplocators} from "../Locators/MCA CLPpage";

export class CLPpage{
    constructor(page) {
        this.page = page;
    }
    async menupage() {
        await this.page.locator(clplocators.navMenu).click();
        await expect(this.page.locator(clplocators.menusearchbutton)).toBeVisible({ timeout: 30000 });


    }

    // Click a category tile on the menu page (e.g. "Sandwiches") and verify its page opens.
    async selectcategory(category) {
        await this.page.getByRole('button', { name: category, exact: true }).click();     
    }

    async selectSubCategory(subCategory) {
    await this.page.getByText(subCategory, { exact: true }).click();
    await expect(this.page.getByRole('button', {name: 'ADD TO CART'})).toBeVisible({ timeout: 30000 });
    }

    async goBackToBeverages() {
    await this.page.locator(clplocators.beveragesbreadcrumbs).click();
    await expect(this.page).toHaveURL(/\/menu\/roswell-000\/beverages$/,{ timeout: 30000 });
    }

    async seachforaprodcut(productname){
        await this.page.locator(clplocators.menusearchbutton).fill(productname);
        const product = this.page.getByText(productname, { exact: true });
        await expect(product).toBeVisible({ timeout: 30000 });
        await product.click();
        await expect(this.page.getByRole('button', {name: 'ADD TO CART'})).toBeVisible({ timeout: 30000 });        
    }
}