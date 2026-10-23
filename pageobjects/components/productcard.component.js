const CARD_SELECTOR = 'a.card[data-test^="product-"]';

const parsePrice = (text) => Number(text.replace(/[^\d.]/g, ''));

class ProductCard {
    get allCards() {
        return $$(CARD_SELECTOR);
    }

    get firstCard() {
        return $(CARD_SELECTOR);
    }

    async getTitle(cardElement) {
        return (await cardElement.$('[data-test="product-name"]').getText()).trim();
    }

    async getPrice(cardElement) {
        const priceElement = await cardElement.$('[data-test="product-price"]');
        await priceElement.waitForDisplayed({
            timeout: 5000
        });
        return parsePrice(await priceElement.getText());
    }

    async getUrl(cardElement) {
        return cardElement.getAttribute('href');
    }

    async getInfo(cardElement) {
        return {
            name: await this.getTitle(cardElement),
            price: await this.getPrice(cardElement),
            url: await this.getUrl(cardElement),
        }
    }

    async getIds() {
        return browser.execute(
            (selector) => Array.from(document.querySelectorAll(selector), (element) => element.getAttribute('data-test')),
            CARD_SELECTOR
        );
    }

}

export default new ProductCard();