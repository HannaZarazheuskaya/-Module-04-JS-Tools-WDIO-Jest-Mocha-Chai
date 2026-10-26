import Page from './page.js';

class AccountPage extends Page{
    constructor() {
        super('/account');
    }

    get pageTitle() {
        return $('[data-test="page-title"]');
    }

    get favoritesBtn() {
        return $('[data-test="nav-favorites"]');
    }

    async openFavorites() {
        await this.favoritesBtn.waitForClickable();
        await this.favoritesBtn.click();
    }

}

export default new AccountPage();