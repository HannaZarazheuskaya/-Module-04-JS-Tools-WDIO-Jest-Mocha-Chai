import Page from './page.js';

class FavoritesPage extends Page {
    constructor() {
        super('/account/favorites');
    }

    get favoriteProductTitles() {
        return $$('[data-test="product-name"]');
    }

    async getProductTitlesList() {
        const items = await this.favoriteProductTitles;
        return Promise.all(items.map(async (item) => (await item.getText()).trim()));
    }
}

export default new FavoritesPage();