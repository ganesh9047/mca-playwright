import { expect } from "@playwright/test";
import { orderFlowLocators } from "../Locators/MCA locators";

export class MCALogin{
   
constructor(page){
    this.page=page;
    // this.headersigninbutton='#link_guestProfile'
    // this.welcomesigninbutton='#signin-button'
    // this.email='#email'
    // this.password='[name="password"]'
    // this.signinbutton='#sign-in-button'

}

async launchurl(){
    await this.page.goto('/')
}
 async login(emailid,password){
    const headerSignIn = this.page.locator(orderFlowLocators.headersigninbutton)
    const welcomeSignIn = this.page.locator(orderFlowLocators.welcomesigninbutton)
    const finalSignIn = this.page.locator(orderFlowLocators.signinbutton)
    const email = this.page.locator(orderFlowLocators.email)

    // Retry the transition because the welcome Sign In click is flaky on slow loads.
    await expect(async () => {
        if (await finalSignIn.isVisible()) return

        if (!(await welcomeSignIn.isVisible())) {
            await headerSignIn.click({ timeout: 5000 })
        }

        await welcomeSignIn.click({ timeout: 5000 })
        await expect(email).toBeVisible({ timeout: 8000 })
        await expect(finalSignIn).toBeVisible({ timeout: 8000 })
    }).toPass({ timeout: 60000 })

    await this.page.locator(orderFlowLocators.email).fill(emailid)
    await this.page.locator(orderFlowLocators.password).fill(password)
    await this.page.locator(orderFlowLocators.signinbutton).click()
//     console.log(
//     // await this.page.locator(orderFlowLocators.Changebutton).count()
// );
    // await expect(this.page.locator(orderFlowLocators.Changebutton)).toBeVisible()

 }

}