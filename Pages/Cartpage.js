import { time } from "node:console";
// import { expect } from "../fixtures/tests-fixtures";
import { cartpagelocators } from "../Locators/MCA cartpage";
import { clplocators } from "../Locators/MCA CLPpage";
import { TIMEOUT } from "node:dns";
import { pdplocators } from "../Locators/MCA Pdppage";
import { expect } from "@playwright/test";

export class Cartpage {
    constructor(page) {
        this.page = page;
    }



async clearExistingCart() {
    // Open the cart
    // await this.page.locator(cartpagelocators.addtocartbutton).toBeVisible({ timeout: 30000 });
    await this.page.locator(cartpagelocators.addtocartbutton).click();

    const removeButtons = this.page.getByRole('button', {
        name: 'Remove',
        exact: true
    });

    const confirmRemove = this.page.getByTestId('remove_btn');

    console.log('Started clearing cart');

    console.log(
        'Products before cleanup:',
        await removeButtons.count()
    );

    // Remove products one by one
    while (await removeButtons.count() > 0) {
        const countBeforeRemoval = await removeButtons.count();

        // Click Remove for the first product
        await removeButtons.first().click();

        // Confirm removal
        await expect(confirmRemove).toBeVisible({ timeout: 10000 });
        await confirmRemove.click();

        // Wait until the Remove button count decreases
        await expect(removeButtons).toHaveCount(
            countBeforeRemoval - 1,
            { timeout: 10000 }
        );
    }

    // Verify that all products have been removed
    await expect(removeButtons).toHaveCount(0);

    console.log('Verified: All products have been removed from the cart.');

    // Close the cart
    await this.page.getByTestId('close_icon').click();
    
    console.log('Cart closed successfully');
}


async addduplicatesproducts(duplicateproducts){
    await expect(this.page.locator(cartpagelocators.addtocartbutton)).toBeVisible({ timeout: 30000 });
    await this.page.locator(cartpagelocators.addtocartbutton).click();
    
    const addMoreItemsButton = await this.page.getByRole('button', {name: 'Add More Items'});
    await addMoreItemsButton.scrollIntoViewIfNeeded();
    await expect(addMoreItemsButton).toBeVisible({timeout: 30000});
    
    const duplicate = this.page.locator('.orderedList').filter({ hasText: duplicateproducts })
    .first();
    await duplicate.getByRole('button', { name: 'Duplicate' }).click();
    // await expect(this.page.locator('.orderedList').filter({ hasText: duplicateproducts })).toHaveCount(2);
    console.log(
    'Matching containers:',
    await this.page.locator('.orderedList')
        .filter({ hasText: duplicateproducts })
        .count()
);

console.log(
    'Product name matches:',
    await this.page.getByText(duplicateproducts, { exact: true }).count()
);

console.log(
    'Duplicate buttons:',
    await duplicate.getByRole('button', { name: 'Duplicate' }).first().count()

);
}

async edittheproducts(subcategory,modifiedprice){
    await this.page.getByRole('button', { name: 'Edit' }).first().click();
    await expect(this.page.locator(pdplocators.producttitle)).toHaveText(subcategory, { timeout: 30000 });
    
    const modifier = this.page.getByRole('radio', {name: 'Unsweet Tea Gallon', exact: true});
        await modifier.dispatchEvent('click');
        await expect(modifier).toBeChecked();
        await this.page.getByTestId('btn_add_to_cart').click();
        await expect(this.page.locator(pdplocators.productprice)).toHaveText(modifiedprice, { timeout: 30000 });

    }

async addpromocode(promocode){
    const addPromoCode = this.page.getByTestId('cart_reward_add_code');
    await addPromoCode.click();
    const addtoorder = this.page.getByRole('button', { name: 'ADD', exact: true });
    await expect(addtoorder).toBeVisible({ timeout: 30000 });
    await this.page.locator(cartpagelocators.promoinputfield).fill(promocode);
    await addtoorder.click();
     const promoDialog = this.page.getByRole('dialog');

    await expect(promoDialog).toBeHidden({
        timeout: 30000
    });
    // await expect(this.page.getByRole('button', { name: 'Close', exact: true })).toBeHidden({ timeout: 20000 });
    // await expect(this.page.getByRole('button', { name: 'REMOVE PROMO CODE' })).toBeVisible({timeout: 30000});
}

async checkoutpage(){
    
    await expect(this.page.locator(cartpagelocators.checkoutbutton)).toBeVisible({ timeout: 30000 });
    await this.page.locator(cartpagelocators.checkoutbutton).click();
    // await this.page.getByRole('link', { name: 'Change' }).click();
}
}
