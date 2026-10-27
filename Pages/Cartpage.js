// import { time } from "node:console";
// import { expect } from "../fixtures/tests-fixtures";
import { cartpagelocators } from "../Locators/MCA cartpage";
import { clplocators } from "../Locators/MCA CLPpage";
// import { TIMEOUT } from "node:dns";
import { pdplocators } from "../Locators/MCA Pdppage";
import { expect } from "@playwright/test";
import { homepagelocators } from "../Locators/MCA Homepage";  

export class Cartpage {
    constructor(page) {
        this.page = page;
    }
  
async clearExistingCart(location, storeName) {
    const cartButton = this.page.locator(
        cartpagelocators.addtocartbutton
    );

    const startOrderButton = this.page.getByRole('button', {
        name: 'START ORDER',
        exact: true
    });

    const changeButton = this.page.getByRole('button', {
        name: /change/i
    });

    const confirmButton = this.page.getByRole('button', {
        name: 'Confirm',
        exact: true
    });

    // SCENARIO 1:
    // Cart button is already visible.
    // Click the cart button and clear the cart.
    if (await cartButton.isVisible()) {
        console.log('Scenario 1: Cart button is visible.');

        await cartButton.click();
    } else {
        // START ORDER should be available if the cart
        // button is not visible.
        await expect(startOrderButton).toBeVisible({
            timeout: 30000
        });

        await startOrderButton.click();

        // SCENARIO 2:
        // Change button is visible, so a location is
        // already selected.
        if (await changeButton.isVisible()) {
            console.log(
                'Scenario 2: Location is already selected.'
            );

            await expect(confirmButton).toBeVisible({
                timeout: 15000
            });

            await confirmButton.click();

            // Wait until the cart button becomes available.
            await expect(cartButton).toBeVisible({
                timeout: 30000
            });

            await cartButton.click();
        } else {
            // SCENARIO 3:
            // Change button is not visible.
            // Search for the location and select the store.
            console.log(
                'Scenario 3: Searching for location and store.'
            );

            const searchField = this.page.locator(
                homepagelocators.searchlocationfield
            );

            await expect(searchField).toBeVisible({
                timeout: 15000
            });

            await searchField.fill(location);

            const suggestion = this.page.getByRole('button', {
                name: location,
                exact: true
            });

            await expect(suggestion).toBeVisible({
                timeout: 15000
            });

            await suggestion.click();

            const storeButton = this.page.getByRole('button', {
                name: storeName
            });

            await expect(storeButton).toBeVisible({
                timeout: 20000
            });

            // Locate the store card containing Order Now.
            const storeCard = this.page.locator('div')
                .filter({ has: storeButton })
                .filter({
                    has: this.page.locator(
                        homepagelocators.storeOrderNowButton
                    )
                })
                .last();

            await storeCard.locator(
                homepagelocators.storeOrderNowButton
            ).click();

            // Confirm the selected location.
            const confirmLocation = this.page.locator(
                homepagelocators.confirmlocation
            );

            await expect(confirmLocation).toBeVisible({
                timeout: 15000
            });

            await confirmLocation.click();

            // Wait for the cart button after location selection.
            await expect(cartButton).toBeVisible({
                timeout: 30000
            });

            await cartButton.click();
        }
    }

    // Clear the cart only if products exist.
    const removeButtons = this.page.getByRole('button', {
        name: 'Remove',
        exact: true
    });

    const confirmRemove = this.page.getByTestId('remove_btn');

    await expect(this.page.getByTestId('close_icon')).toBeVisible({
        timeout: 15000
    });

    console.log(
        'Products before cleanup:',
        await removeButtons.count()
    );

    while (await removeButtons.count() > 0) {
        const countBeforeRemoval = await removeButtons.count();

        // Remove the first product.
        await removeButtons.first().click();

        // Confirm removal.
        await expect(confirmRemove).toBeVisible({
            timeout: 10000
        });

        await confirmRemove.click();

        // Wait until the product is removed from the list.
        await expect(removeButtons).toHaveCount(
            countBeforeRemoval - 1,
            { timeout: 15000 }
        );
    }

    // Verify the cart is empty.
    await expect(removeButtons).toHaveCount(0);

    console.log('Verified: All products have been removed.');

    // Close the cart.
    await this.page.getByTestId('close_icon').click();

    console.log('Cart closed successfully.');
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
    await expect(addPromoCode).toBeVisible({ timeout: 30000 });
    await addPromoCode.click();
    const addtoorder = this.page.getByRole('button', { name: 'ADD', exact: true });
    await expect(addtoorder).toBeVisible({ timeout: 30000 });
    await this.page.locator(cartpagelocators.promoinputfield).fill(promocode);
    await addtoorder.click();

    //  const promoDialog = this.page.getByRole('dialog');

    // await expect(promoDialog).toBeHidden({
    //     timeout: 30000
    // });
    // await expect(this.page.getByRole('button', { name: 'Close', exact: true })).toBeHidden({ timeout: 20000 });
    // await expect(this.page.getByRole('button', { name: 'REMOVE PROMO CODE' })).toBeVisible({timeout: 30000});
}

async checkoutpage(){
    
    await expect(this.page.locator(cartpagelocators.checkoutbutton)).toBeVisible({ timeout: 30000 });
    await this.page.locator(cartpagelocators.checkoutbutton).click();
    // await this.page.getByRole('link', { name: 'Change' }).click();
}

}