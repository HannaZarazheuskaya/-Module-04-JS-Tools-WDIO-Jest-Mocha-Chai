import { HomePage } from '../pageobjects/index.js';
import { expect } from 'chai';

// #6 Feature: Filtering
//   Scenario: Filter products by category and price range
//     Given the user is on the home page 
//     When the user filters products by price range from 0 to 10
//     And the user selects the first category
//     Then all displayed products should belong to the selected category
//     And all displayed products should have price from 0 to 10

describe('Filter products by category and price range', () => {
    
    beforeEach(async() => {
        await HomePage.open();
    });

    it('should filter products by specific category and price range', async() => {
        await HomePage.sidebar.filterByPriceRange(0, 10);

        const checkbox = await HomePage.sidebar.firstCategoryCheckbox;
        expect(await checkbox.isExisting()).to.be.true;

        await HomePage.sidebar.clickCheckbox(checkbox);

        const catalogCards = await HomePage.productCard.allCards;
        expect(catalogCards.length).to.be.above(
            0,
            'There are no products in the selected category'
        );

        for(const card of catalogCards) {
            const productInformation = await HomePage.productCard.getInfo(card);
            chaiExpect(productInformation.name).to.not.be.empty;
            chaiExpect(productInformation.price).to.be.at.least(0);
            chaiExpect(productInformation.price).to.be.at.most(10);
        }
    });
});