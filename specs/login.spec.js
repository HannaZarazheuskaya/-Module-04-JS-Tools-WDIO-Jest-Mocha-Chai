import { LoginPage, HomePage } from '../pageobjects/index.js';
import users from '../testdata/users.json' with {type: 'json'};
import { expect } from 'chai';

// #1 Feature: Log in
//   Scenario: Log in with valid credentials
//     Given the user is on the login page
//     When the user logs in with valid credentials
//     Then the user should be redirected to “My Account” page
//     And the user's name should be displayed in the profile

describe('Log in with valid credentials', () => {
    
    it('should log in successfully as a User with valid credentials', async() => {
        const user = users.customer1;

        await LoginPage.open();

        await LoginPage.login(user.email, user.password);

        await browser.waitUntil(async() => {
            const currentUrl = await browser.getUrl();
            return currentUrl.includes('/account');
        }, {
            timeout: 5000,
            timeoutMsg: 'User was not redirected to My account page upon login'
        });

        const actualName = await HomePage.header.getUserName();

        expect(actualName).to.equal(user.name);
    });
});