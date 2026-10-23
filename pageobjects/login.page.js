import Page from "./page.js";
import { HeaderComponent } from "./components/index.js";

class LoginPage extends Page {
    constructor() {
        super('/auth/login');
    }

    get header() {
        return HeaderComponent;
    }

    get emailField() {
        return $('[data-test="email"]');
    }

    get passwordField() {
        return $('[data-test="password"]');
    }

    get loginButton() {
        return $('[data-test="login-submit"]');
    }

    async login(email, password) {
        await this.emailField.waitForDisplayed();
        await this.emailField.setValue(email);

        await this.passwordField.waitForDisplayed();
        await this.passwordField.setValue(password);

        await this.loginButton.waitForClickable();
        await this.loginButton.click();

        await browser.waitUntil(async() => !(await browser.getUrl()).includes('/auth/login'),
        {
            timeout: 10000,
            timeoutMsg: 'Login did not complete: still on the login page'
        })
    }
}

export default new LoginPage();