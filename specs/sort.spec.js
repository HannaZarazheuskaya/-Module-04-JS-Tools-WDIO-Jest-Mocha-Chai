import { should } from "chai";
import { HomePage } from "../pageobjects/index.js";
should();

// #5 Feature: Sorting
//   Scenario: Sort products by price from high to low
//     Given the user is on the home page
//     When the user sorts products by price from highest to lowest
//     Then the products should be displayed in descending order by price
//     And the first product should have the highest price

describe('Sort products by price from High to Low', () => {

    beforeEach(async() => {
        await HomePage.open();
    });

    it('Sort products by price from High to Low as a Guest', async() => {
        await HomePage.sidebar.sortBy('price,desc');

        const prodCards = await HomePage.productCard.allCards;
        const prodPrices = []; 

        for (let i = 0; i < prodCards.length; i++) {
            prodPrices.push(await HomePage.productCard.getPrice(prodCards[i]));
        }
        
        prodPrices.length.should.be.above(0);

        const expectedPricesSorted = [...prodPrices].sort((a, b) => b - a);
        prodPrices.should.deep.equal(expectedPricesSorted);

        const maxPrice = Math.max(...prodPrices);
        prodPrices[0].should.equal(maxPrice);
    });
});