import Page from "./page.js";
import { HeaderComponent, Sidebar, ProductCard } from "./components/index.js";

class HomePage extends Page {
    constructor() {
        super('/');
    }

    get header() {
        return HeaderComponent;
    }

    get sidebar() {
        return Sidebar;
    }

    get productCard() {
        return ProductCard;
    }

    async openFirstProduct() {
        const cards = await this.productCard.allCards;
        await cards[0].waitForDisplayed();
        await cards[0].click();
    }
}
export default new HomePage();