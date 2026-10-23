import Page from './page.js';
import { HeaderComponent } from './components/index.js';

class CheckoutPage extends Page{
    constructor() {
        super('/checkout');
    }

    get header() {
        return HeaderComponent;
    }

    get cartTableRows() {
        return $$('tbody tr');
    }

    get firstRemoveBtn() {
        return $('tbody tr .btn-danger');
    }

    get cartEmptyMsg() {
        return $('p*=The cart is empty. Nothing to display.');
    }


    get firstProdQuantityInput() {
        return $('tbody tr [data-test="product-quantity"]');
    }

    get proceedToCheckoutBtn1() {
        return $('[data-test="proceed-1"]');
    }   


    get addressForm() {
        return $('.login-form-1 form');
    }

    get countryDropdown() {
        return $('[data-test="country"]');
    }

    get postalCode() {
        return $('[data-test="postal_code"]');
    }

    get houseNum() {
        return $('[data-test="house_number"]');
    }

    
    get paymentMethod() {
        return $('[data-test="payment-method"]');
    }

    get confirmBtn() {
        return $('[data-test="finish"]');
    }

    get orderConfirmationMsg() {
        return $('#order-confirmation');
    }


    async removeFirstProdFromCart() {
        await this.firstRemoveBtn.waitForClickable();
        await this.firstRemoveBtn.click();
    }

    async getFirstProdQuantity() {
        await this.firstProdQuantityInput.waitForDisplayed();
        const value = await this.firstProdQuantityInput.getValue();
        return parseInt(value, 10);
    }

    async clickProceed() {
        await this.proceedToCheckoutBtn1.waitForClickable();
        await this.proceedToCheckoutBtn1.click();
    }

    async confirmLogInStep() {
        const proceedToCheckoutBtn2 = $('[data-test="proceed-2"]');
        await proceedToCheckoutBtn2.waitForClickable();
        await proceedToCheckoutBtn2.click();
    }

    async confirmAddressStep() {
        const proceedToCheckoutBtn3 = $('[data-test="proceed-3"]');
        await proceedToCheckoutBtn3.waitForClickable();
        await proceedToCheckoutBtn3.click();
    }

    async setBillingAddress(address) {
        await this.countryDropdown.waitForDisplayed();
        await this.countryDropdown.selectByIndex(1);
        await this.postalCode.setValue(address.postCode);
        await this.houseNum.setValue(address.houseNumber);
    }
}

export default new CheckoutPage();