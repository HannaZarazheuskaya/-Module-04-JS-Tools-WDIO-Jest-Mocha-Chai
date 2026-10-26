import Page from './page.js';

class FavoritesPage extends Page {
    constructor() {
        super('/account/favorites');
    }

    get favoriteProductTitles() {
        return $$('[data-test="product-name"]');
    }

    async getProductTitlesList() {
        await browser.waitUntil(async() => (await this.favoriteProductTitles).length > 0,
        {
            timeout: 10000,
            timeoutMsg: 'No products displayed on My Favorites page'
        }
    );
        const items = await this.favoriteProductTitles;
        const titles = [];
        for (let i = 0; i < items.length; i++) {
            titles.push((await items[i].getText()).trim());
        }
        return titles;
    }
}

export default new FavoritesPage();