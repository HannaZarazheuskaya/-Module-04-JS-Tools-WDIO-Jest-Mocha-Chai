<<<<<<< HEAD
# Module 4 Task. JS Automation Frameworks: WDIO, Mocha, Chai


## Task Description
<details>
<summary><b> Please click here to expand the full task</b></summary>

For this practical task should be automated written in Module 2 scenarios

1. Build a framework using WDIO and Mocha setup
2. Make sure Chai library is set up and used in your framework
3. Practice with Assert, Should, Expect interfaces to use them in tests
4. Understand the differences between mentioned interfaces
5. Push the code to remote repository and create Merge Request

Assessment criteria (pass rate is 70%)

Here’s the list of actions which result in reduction of overall mark for a completed task:
1. WDIO, Mocha, Chai weren’t set up within Test Automation Framework (-70%)
2. One mentioned interface isn’t used in tests (1 interface = -10%)
</details>


## Scenarios Under Test 

<details>
<summary><b> Please click here to expand the scenarios</b></summary>

### Scenario 1: Log in with valid credentials

    Given the user is on the login page
    When the user logs in with valid credentials
    Then the user should be redirected to “My Account” page
    And the user's name should be displayed in the profile

### Scenario 2: Add products to cart from the product details page

    Given the user is on the home page
    When the user views a product detail page 
    And the user adds 3 items of this product to cart
    Then the cart icon should display 3 items
    When user opens cart
    Then the cart should contain 3 items of this product

### Scenario 3: Remove a product from the shopping cart
    
    Background: 
    
        Given the user is on the home page
        And the user opens a product detail page
        And the user adds the product to cart
        And the user opens the cart

    Scenario: Remove a product from the shopping cart

        Given the user is on the cart page 
        When the user removes the product from the cart
        Then the cart should contain no products
        And the message “The cart is empty. Nothing to display.” should be displayed

### Scenario 4: Change localization to German

    Given the user is on the home page  
    When the user switches the language to German
    Then the user should remain on the same page
    And the labels should be translated into German

### Scenario 5: Sort products by price from high to low

    Given the user is on the home page
    When the user sorts products by price from highest to lowest
    Then the products should be displayed in descending order by price
    And the first product should have the highest price

### Scenario 6: Filter products by category and price range

    Given the user is on the home page 
    When the user filters products by price range from 0 to 10
    And the user selects the first category
    Then all displayed products should belong to the selected category
    And all displayed products should have price from 0 to 10

### Scenario 7: Add a product to Favorites

    Background:
    
        Given the user is logged in

    Scenario: Add a product to Favorites

        Given the user is on the product detail page of the first product
        When the user adds the product to Favorites
        And the user opens the Favorites page
        Then the added product should be displayed on the Favorites page

### Scenario 8: Checkout with 'Cash on Delivery' payment

    Background: 
    
        Given the user is logged in
        And the user has two products in the cart
        And the user proceeds to checkout
        And the user enters valid billing address

    Scenario: Checkout with 'Cash on Delivery' payment
    
        Given the user is on the payment page
        When the user selects “Cash on Delivery” payment option
        And the user confirms payment
        Then the order confirmation with the invoice number should be displayed 
</details>

## Project structure
```
[Task] JS Tools WDIO, JestMocha, Chai/
├── tests/
│   ├── pageobjects/    page objects
│   │   └── components/ page object components
│   ├── specs/          tests
│   └── testdata/       credentials, address
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── wdio.conf.js
```
* **pageobjects**: page classes with element getters and action methods. They extend the base page that keeps the path and has the `open()` method.
* **components**: components, such as header, sidebar, product cards.
* **specs**: only the test flow and the assertions in three styles: assert, should and expect.
* **testdata**: contains user and admin credentials.
* **wdio.conf.js**: base url, browsers' capabilities, timeouts, specs.


## Tools 
* **Core Framework:** WebdriverIO v10.0.2
* **Design Pattern:** Page Object Model
* **Test Runner:** Local Runner
* **Test Framework:** Mocha v10.0.1
* **Assertions:** Chai v6.3.0 (should, assert, expect)
* **Selectors:** CSS selectors, mainly `data-test` attributes
* **Browsers**: Chrome, Microsoft Edge (parallel run)

## Instructions to run 

As a prerequisite, you need to have Node.js, Chrome and Edge installed. 

**1. Install the dependencies**

Open the project folder and run in terminal:
`npm install`

**2. Run all tests**

To run all tests simultaneously in both browsers (Chrome and Edge) use:
`npm run wdio`

**3. Run a specific test**

To run only one spec file, e.g. `login.spec.js`:
`npx wdio run ./wdio.conf.js --spec ./tests/specs/login.spec.js`

**4. Run tests in a specific browser**

To run tests in only one browser use:
`npx wdio run ./wdio.conf.js --browser chrome`
or
`npx wdio run ./wdio.conf.js --browser MicrosoftEdge`
=======
# -Module-04-JS-Tools-WDIO-Jest-Mocha-Chai
>>>>>>> origin/main
