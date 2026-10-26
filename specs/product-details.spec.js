import { assert } from "chai";
import { HomePage, ProductDetailPage, CheckoutPage } from "../pageobjects/index.js";

// #2 Feature: Product details page
//   Scenario: Add products to cart from the product details page
//     Given the user is on the home page
//     When the user views a product detail page 
//     And the user adds 3 items of this product to cart
//     Then the cart icon should display 3 items
//     When user opens cart
//     Then the cart should contain 3 items of this product

describe('Cart actions on the product details page', () => {

	beforeEach(async() => {
    	await HomePage.open();
    });

	it('should add several product items to cart from product details page', async () => {
		await HomePage.openFirstProduct();
		await ProductDetailPage.increaseProdQuantity(3);
		await ProductDetailPage.addToCart();
		
		const cartBadgeCount = await ProductDetailPage.header.getCartQuantity();
		assert.equal(
			cartBadgeCount,
			3,
			'Cart badge does not display expected count.'
		);

		await ProductDetailPage.header.openCart();
		const productQuantity = await CheckoutPage.getFirstProdQuantity();
		assert.equal(
			productQuantity,
			3,
			'Product quantity in the cart does not match the added number of items.'
		);
	});

});