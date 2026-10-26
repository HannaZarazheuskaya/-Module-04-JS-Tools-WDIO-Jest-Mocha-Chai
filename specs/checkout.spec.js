import { assert } from 'chai';
import { LoginPage, HomePage, CheckoutPage, ProductDetailPage } from '../pageobjects/index.js';
import users from '../testdata/users.json' with { type: 'json' };

describe('Cart actions and checkout', () => {

    // #3 Feature: Cart
    //   Background: 
    //     Given the user is on the home page
    //     And the user opens a product detail page
    //     And the user adds the product to cart
    //     And the user opens the cart

    //   Scenario: Remove a product from the shopping cart
    //     Given the user is on the cart page 
    //     When the user removes the product from the cart
    //     Then the cart should contain no products
    //     And the message “The cart is empty. Nothing to display.” should be displayed

    describe('Remove a product from cart as a Guest user', () => {

        beforeEach(async() => {
            await HomePage.open();
            await HomePage.openFirstProduct();

            await ProductDetailPage.increaseProdQuantity(2);
            await ProductDetailPage.addToCart();
            await ProductDetailPage.header.openCart();
        });

        it('should remove a product from the cart', async() => {
            await CheckoutPage.removeFirstProdFromCart();
            await CheckoutPage.cartEmptyMsg.waitForDisplayed({
                timeout: 5000,
                timeoutMsg: 'Message saying the cart is empty was not displayed.'
            });

            const actualMsg = await CheckoutPage.cartEmptyMsg.getText();
            assert.equal(
                actualMsg, 
                'The cart is empty. Nothing to display.', 
                'Text of the empty cart message is incorrect.'
            );

            const productsInCart = await CheckoutPage.cartTableRows;
            assert.equal(
                productsInCart.length,
                0,
                'Cart table is still present, it is not empty.'
            );
        });
    });

    //   #8 Feature: Checkout
    //   Background: 
    //     Given the user is logged in
    //     And the user has two products in the cart
    //     And the user proceeds to checkout
    //     And the user enters valid billing address

    //   Scenario: Checkout with 'Cash on Delivery' payment
    //     Given the user is on the payment page
    //     When the user selects “Cash on Delivery” payment option
    //     And the user confirms payment
    //     Then the order confirmation with the invoice number should be displayed 

    describe('Checkout with a specific payment option', () => {

        beforeEach(async () => {
            const user = users.customer1;

            await LoginPage.open();
            await LoginPage.login(user.email, user.password);

            await HomePage.open();
            await HomePage.openFirstProduct();

            await ProductDetailPage.increaseProdQuantity(2);
            await ProductDetailPage.addToCart();
            await ProductDetailPage.header.openCart();
            
            await CheckoutPage.clickProceed();
            await CheckoutPage.confirmLogInStep();
            await CheckoutPage.setBillingAddress(user.address);
            await CheckoutPage.confirmAddressStep();
        });

        it('Checkout with Cash on Delivery payment option', async() => {
            await CheckoutPage.paymentMethod.waitForDisplayed({
                timeoutMsg: 'Payment Method page did not load.'
            });

            await CheckoutPage.paymentMethod.selectByVisibleText('Cash on Delivery');

            await CheckoutPage.confirmBtn.waitForClickable();
            await CheckoutPage.confirmBtn.click();
            await browser.waitUntil(async () => {
                const btnText = await CheckoutPage.confirmBtn.getText();
                return btnText.trim() === 'Confirm';
            }, {
                timeout: 5000,
                timeoutMsg: 'Confirmation button text did not change'
            });
            await CheckoutPage.confirmBtn.click();

            await CheckoutPage.orderConfirmationMsg.waitForDisplayed({
                timeout: 5000,
                timeoutMsg: 'Order confirmation message did not load.'});

            const actualConfirmationMsg = await CheckoutPage.orderConfirmationMsg.getText();

            assert.include(
                actualConfirmationMsg,
                'Thanks for your order! Your invoice number is',
                'Confirmation has no invoice info.'
            );
        });
    });
});