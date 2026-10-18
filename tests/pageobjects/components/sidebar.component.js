export const SortOption = Object.freeze({
    NAME_A_Z: 'name,asc',
    NAME_Z_A: 'name,desc',
    PRICE_HIGH_TO_LOW: 'price,desc',
    PRICE_LOW_TO_HIGH: 'price,asc',
});


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
        return $('#filters > .checkbox > label > input[type="checkbox"], #filters div[data-test^="category-"] input');
    }

    get firstProductCard() {
        return $('[data-test^="product-"]');
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

    async filterByPriceRange(min, max) {
        await this.priceSliderMin.waitForDisplayed();

        const firstCardTextBefore = await this.firstProductCard.getText().catch(() => '');

        if (min > 0) {
            await this.priceSliderMin.dragAndDrop({x:30, y:0});
        }

        if (max < 200) {
            await this.priceSliderMax.dragAndDrop({x:-100, y:0});
        }
        
        await browser.waitUntil(async() => {
            const currentText = await this.firstProductCard.getText().catch(() => '')
            return currentText !== firstCardTextBefore;
        }, {
            timeout: 5000,
            timeoutMsg: 'Product layout did not change after price range change'
        });
    }

    get sortDropdown() {
        return $('[data-test="sort"]');
    }

    async sortBy(sortValue) {
        await this.sortDropdown.waitForDisplayed();
        const firstCardTextBefore = await this.firstProductCard.getText().catch(() => '');

        await this.sortDropdown.selectByAttribute('value', sortValue);
        await browser.waitUntil(async () => {
            const currentText = await this.firstProductCard.getText().catch(() => '');
            return currentText !== firstCardTextBefore;
        }, {
            timeout: 5000,
            timeoutMsg: `Product are not filtered according to sorting criteria ${sortValue}`
        });
    }
}
export default new Sidebar();