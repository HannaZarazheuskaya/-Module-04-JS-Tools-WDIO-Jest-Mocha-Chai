import Page from "./page.js";
import { HeaderComponent } from "./components/index.js";

class ProductDetailPage extends Page {
    constructor() {
        super('/product');
    }

    get header() {
        return HeaderComponent;
    }

    get productName() {
        return $('[data-test="product-name"]');
    }

    get productPrice() {
        return $('[data-test="unit-price"]');
    }

    get productQuantity() {
        return $('[data-test="quantity"]');
    }

    get increaseQuantityBtn() {
        return $('[data-test="increase-quantity"]');
    }

    get addToCartBtn() {
        return $('[data-test="add-to-cart"]');
    }

    get addToFavoritesBtn() {
        return $('[data-test="add-to-favorites"]');
    }

    async increaseProdQuantity(count) {
        await this.increaseQuantityBtn.waitForClickable();
        const clicksRequired = count-1;        
        for (let i = 0; i < clicksRequired; i++) {
            await this.increaseQuantityBtn.click();
        }
    }

    async addToCart() {
        await this.addToCartBtn.waitForClickable();
        await this.addToCartBtn.click();
    }

    async addToFavorites() {
        await this.addToFavoritesBtn.waitForClickable();
        await this.addToFavoritesBtn.click();
    }
}

export default new ProductDetailPage();