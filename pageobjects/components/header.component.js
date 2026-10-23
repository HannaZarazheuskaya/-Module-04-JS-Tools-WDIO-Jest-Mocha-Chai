class Header {
    get navBar() {
        return $('nav.navbar');
    }

    get homeLink() {
        return $('[data-test="nav-home"]');
    }

    get categoriesMenu() {
        return $('[data-test="nav-categories"]');
    }
    
    get contactLink() {
        return $('[data-test="nav-contact"]');
    }
    
    get signInLink() {
        return $('[data-test="nav-sign-in"]');
    }

    get userMenu() {
        return $('[data-test="nav-menu"]');
    }

    get myFavoritesLink() {
        return $('[data-test="nav-my-favorites"]');
    }
    
    get cart() {
        return $('[data-test="nav-cart"]');
    }

    get cartQuantity() {
        return $('[data-test="cart-quantity"]');
    }

    get languageDropdown() {
        return $('[data-test="language-select"]');
    }

    languageSelection(languageCode) {
        return $(`[data-test="lang-${languageCode}"]`);
    }

    
    async signIn() {
        await this.signInLink.waitForClickable();
        await this.signInLink.click();
    }

    async getUserName() {
        await this.userMenu.waitForDisplayed({
            timeoutMsg:'User menu not displayed'
        });
        return (await this.userMenu.getText()).trim();
    }

    async openFavorites() {
        await this.userMenu.waitForClickable();
        await this.userMenu.click();
        await this.myFavoritesLink.waitForClickable();
        await this.myFavoritesLink.click();
    }

    async openCart() {
        await this.cart.waitForClickable();
        await this.cart.click();
    }

    async getCartQuantity() {
        await this.cartQuantity.waitForDisplayed({
            timeoutMsg: 'Icon with number of items in the cart is not displayed'
        });
        return Number(await this.cartQuantity.getText());
    }

    async getCurrentLanguage() {
        return (await this.languageDropdown.getText()).trim();
    }

    async getMenuLabels() {
        const labels = {
            home: (await this.homeLink.getText()).trim(),
            categories: (await this.categoriesMenu.getText()).trim(),
            contact: (await this.contactLink.getText()).trim(),
            signIn: (await this.signInLink.getText()).trim()
        };

        if (await this.signInLink.isExisting()) {
            labels.signIn = (await this.signInLink.getText()).trim();
        }
        return labels;
    }

    async changeLanguage(languageCode) {
        const expectedCode = languageCode.toUpperCase();

        if ((await this.getCurrentLanguage()) === expectedCode) {
            return;
        }
        const menuTextBefore = await this.navBar.getText();

        await this.languageDropdown.waitForClickable();
        await this.languageDropdown.click();
        await this.languageSelection(languageCode).waitForClickable();
        await this.languageSelection(languageCode).click();

        await browser.waitUntil(
            async () => (await this.getCurrentLanguage()) === expectedCode && (await this.navBar.getText()) !== menuTextBefore,
            {
                timeoutMsg: 'Translation was unsuccessful'
            }
        );
    }
}

export default new Header();