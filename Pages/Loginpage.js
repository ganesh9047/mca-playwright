exports.Loginpage=
class Loginpage{

    constructor(page){
       this.page= page;
       this.usernamefield= '#username';
       this.passwordfield= '#password';
       this.siginbutton = '#signInBtn';
    }

    async gotoLoginpage(){
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async ValidLogin(username,password){
        await this.page.locator(this.usernamefield).fill(username);
        await this.page.locator(this.passwordfield).fill(password);
        await this.page.locator(this.siginbutton).click();
    }

    async InvalidLogin(username,password){
        await this.page.locator(this.usernamefield).fill(username);
        await this.page.locator(this.passwordfield).fill(password);
        await this.page.locator(this.siginbutton).click();
    }

    async Emptycrendentials(){
        await this.page.locator(this.siginbutton).click();
    }
}