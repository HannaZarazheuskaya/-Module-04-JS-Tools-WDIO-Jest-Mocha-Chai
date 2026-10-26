import { HomePage, LoginPage, ProductDetailPage, FavoritesPage } from "../pageobjects/index.js";
import users from "../testdata/users.json" with {type: 'json'};
import { should } from "chai";
should();

// #7 Feature: Favorites
//   Background:
//     Given the user is logged in

//   Scenario: Add a product to Favorites
//     Given the user is on the product detail page of the first product
//     When the user adds the product to Favorites
//     And the user opens the Favorites page
//     Then the added product should be displayed on the Favorites page

describe('Add a product to Favorites as a user', () => {
    
    beforeEach(async() => {
        const user = users.customer2;
        
        await LoginPage.open();
        await LoginPage.login(user.email, user.password);
        await LoginPage.header.userMenu.waitForDisplayed({
            timeout: 5000,
            timeoutMsg: 'User was not logged in successfully'
        });
    });

    it('should add a product to Favorites as a user', async() => {
        await HomePage.open();
        await HomePage.openFirstProduct();

        await ProductDetailPage.productName.waitForDisplayed();
        const expectedProductName = (await ProductDetailPage.productName.getText()).trim();
        await ProductDetailPage.addToFavorites();
        await ProductDetailPage.header.openFavorites();

        const actualFavoriteProducts = await FavoritesPage.getProductTitlesList();

        actualFavoriteProducts.should.include(expectedProductName);
    });
})