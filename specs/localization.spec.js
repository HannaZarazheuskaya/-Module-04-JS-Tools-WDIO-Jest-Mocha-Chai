import { assert } from 'chai';
import { HomePage } from '../pageobjects/index.js';

// #4 Feature: Localization
//   Scenario: Change localization to German
//     Given the user is on the home page
//     When the user switches the language to German
//     Then the user should remain on the same page
//     And the labels should be translated into German

describe('Localization check of the header', () => {

    beforeEach(async () => {
        await HomePage.open();
    });

    it('should translate header elements into German for a Guest user', async() => {
        await HomePage.header.changeLanguage('de');

        const actualHeaderLabels = await HomePage.header.getMenuLabels();
        const expectedGermanLabels = {
            home: 'Start',
            categories: 'Kategorien',
            contact: 'Kontakt',
            signIn: 'Einloggen'
        };
        assert.deepEqual(actualHeaderLabels, expectedGermanLabels);
    });
});