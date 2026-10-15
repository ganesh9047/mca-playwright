import { expect } from '@playwright/test';
exports.Formpage=
class Formpage{

constructor(page){
     this.page= page;
     this.namefield='#name'
     this.emailfield='#email'
     this.phoennumberfield='#phone'
     this.addressfield='#textarea'
     this.maleradiobutton='#male'
     this.sundaycheckbox='#sunday'
     this.countrydropdown='#country'
     this.datepicker='#datepicker'
     this.datepickernext='.ui-icon.ui-icon-circle-triangle-e'
    //  this.selectdate=`[data-date="${date}"]`
     this.datepicker2='#txtDate'
     this.selectmonth2='select[aria-label="Select month"]'
     this.selectyear2='select[aria-label="Select year"]'
     this.selectdate2='[data-date="28"]'
     


}

async loginintoapp(){
    await this.page.goto('https://testautomationpractice.blogspot.com/')

}

//Input fields,Radiobuttons, checkboxes,dropdown 
async frompage(name,email,phone,address,months,date){
    await this.page.locator(this.namefield).fill('name')
    await this.page.locator(this.emailfield).fill('email')
    await this.page.locator(this.phoennumberfield).fill('phone')
    await this.page.locator(this.addressfield).fill('address')
    await this.page.locator(this.maleradiobutton).scrollIntoViewIfNeeded();
    await this.page.locator(this.maleradiobutton).check()
    await expect(this.page.locator(this.maleradiobutton)).toBeChecked();
    await this.page.locator(this.sundaycheckbox).check()
    await expect(this.page.locator(this.sundaycheckbox)).toBeChecked();
    await this.page.locator(this.countrydropdown).selectOption({value:'canada'}); 
    await expect(this.page.locator(this.countrydropdown)).toHaveValue('canada');
    await this.page.locator(this.datepicker).scrollIntoViewIfNeeded();

    //datepicker 1
    await this.page.locator(this.datepicker).click();
      for (let i = 0; i < months; i++) {
        await this.page.locator(this.datepickernext).click();
    }
    await this.page.locator(`[data-date="${date}"]`).click();
    // await this.page.locator(this.datepickernext,).click();
    // await this.page.locator(this.selectdate, { name: '28' }).click();
    // await this.page.locator(this.selectdate).click();
    await expect(this.page.locator(this.datepicker)).toHaveValue('01/28/2027');

    //datepicker2
    await this.page.locator(this.datepicker2).click();
    await this.page.locator(this.selectmonth2).selectOption({value: '8'});
    await this.page.locator(this.selectyear2).selectOption({value: '2026'});
    await this.page.locator(this.selectdate2).click();
    await expect(this.page.locator(this.datepicker2)).toHaveValue('28/09/2026');

    // datepicker3



    



}
   
}
