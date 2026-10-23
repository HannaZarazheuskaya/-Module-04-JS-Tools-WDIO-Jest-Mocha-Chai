class Sidebar {
    get sectionTitles() {
        return $$('#filters h4.grid-title');
    }

    get searchField() {
        return $('[data-test="search-query"]');
    }

    get searchSubmitBtn() {
        return $('[data-test="search-submit"]');
    }

    get priceRange() {
        return $('.ngx-slider');
    }

    get priceSlider() {
        return $('#filters .ngx-slider');
    }

    get priceSliderMin() { 
        return $('#filters .ngx-slider-pointer-min'); 
    }
    
    get priceSliderMax() {
        return $('#filters .ngx-slider-pointer-max');
    }

    get firstCategoryCheckbox() {
        return $('(//*[@id="filters"]//input[@name="category_id"])[1]');
    };

    get firstProductCard() {
        return $('(//a[contains(@class, "card")][starts-with(@data-test, "product-")])[1]');
    }

   
    
    async clickCheckbox(checkbox) {
        await checkbox.scrollIntoView();

        const firstCardTextInitial = await this.firstProductCard.getText().catch(() => '');
        await checkbox.click();

        await browser.waitUntil(async () => {
            const currentText = await this.firstProductCard.getText().catch(() => '');
            return currentText !== firstCardTextInitial;
        }, {
            timeout: 5000,
            timeoutMsg: 'Products have not been filtered by category'
        });
    }

    async search(query) {
        await this.searchField.setValue(query);
        await this.searchSubmitBtn.click();
    }

    async setSliderValue(pointer, target) {
        await pointer.scrollIntoView();
        await pointer.click();
        for (let i = 0; i < 200; i++) {
            const current = Number(await pointer.getAttribute('aria-valuenow'));
            if (current === target) {
                return;
            }
            await browser.keys(current > target ? 'ArrowLeft' : 'ArrowRight');
        }
        throw new Error(`Could not set price slider to ${target}`);
    }

    async filterByPriceRange(min, max) {
        await this.priceSliderMin.waitForDisplayed();
        await this.firstProductCard.waitForDisplayed();

        const cardsBefore = (await this.getProductCardsText()).join('|');

        if (min > 0) {
            await this.setSliderValue(this.priceSliderMin, min);
        }
        await this.setSliderValue(this.priceSliderMax, max);

        await browser.waitUntil(async () => {
            const cardsNow = (await this.getProductCardsText()).join('|');
            return cardsNow !== cardsBefore;
        }, {
            timeout: 10000,
            timeoutMsg: 'Product layout did not change after price range change'
        });
    }

    get sortDropdown() {
        return $('[data-test="sort"]');
    }

    async getProductCardsText() {
        return browser.execute(() =>
            Array.from(document.querySelectorAll('a.card[data-test^="product-"]'), (el) => el.innerText)
        );
    }

    async sortBy(sortValue) {
        await this.sortDropdown.waitForDisplayed();
        await this.firstProductCard.waitForDisplayed();
        const cardsBefore = (await this.getProductCardsText()).join('|');

        await this.sortDropdown.selectByAttribute('value', sortValue);
        await browser.waitUntil(async () => {
            const cardsNow = (await this.getProductCardsText()).join('|');
            return cardsNow !== cardsBefore;
        }, {
            timeout: 10000,
            timeoutMsg: `Product are not filtered according to sorting criteria ${sortValue}`
        });
    }
}
export default new Sidebar();