import { test, expect, searchFor } from './fixtures'
import { HomePage } from '../pageObjects/homePage'
import { SearchResults } from '../pageObjects/searchResults'
import { ProductPage } from '../pageObjects/productPage'
import { AddToCart } from '../pageObjects/addToCart'
import { CartScreen } from '../pageObjects/cartScreen'

test('Search on Amazon', async ({ homePage }) => {
    await searchFor(homePage, 'Dungeons')
})

test('Search and click on Best Seller', async ({ homePage, searchResults }) => {
    await searchFor(homePage, 'Dungeons')
    await searchResults.clickOnMostSold()
})

test('Search, click on best seller, add to cart', async ({ homePage, searchResults, productPage }) => {
    await searchFor(homePage, 'Dungeons')
    await searchResults.clickOnMostSold()
    await productPage.cartButtonClick()
})

test('Search, bestseller, add to cart, go to cart', async ({ homePage, searchResults, productPage, addToCart }) => {
    await searchFor(homePage, 'Dungeons')
    await searchResults.clickOnMostSold()
    await productPage.cartButtonClick()
    await addToCart.goToCartClick()
})

test('Cart count badge increments after add to cart', async ({ homePage, searchResults, productPage, page }) => {
    await searchFor(homePage, 'Dungeons')
    await searchResults.clickOnMostSold()
    await productPage.cartButtonClick()

    const cartCount = page.locator('#nav-cart-count')
    await expect(cartCount).toBeVisible()
    const count = Number((await cartCount.textContent())?.trim() ?? '0')
    expect(count).toBeGreaterThan(0)
})

test('Product page shows title and price', async ({ homePage, searchResults, productPage, page }) => {
    await searchFor(homePage, 'Dungeons')
    await searchResults.clickOnMostSold()

    await expect(page.locator('#productTitle')).toBeVisible()
    await expect(
        page.locator('#corePriceDisplay, #priceblock_ourprice, #apex_desktop, .a-price').first()
    ).toBeVisible()
})

test('Invalid search shows no results message', async ({ homePage, page }) => {
    await homePage.gotoAmazon()
    await homePage.clickOnSearch()
    await homePage.typeOnSearch('zzzqqq123zzz')
    await homePage.submitSearch()

    await expect(
        page.getByText(/no encontramos|no coincidencias|sin resultados|no hay resultados/i)
    ).toBeVisible()
})

test('Cart remove item leaves an empty cart', async ({ homePage, searchResults, productPage, addToCart, cartScreen, page }) => {
    await searchFor(homePage, 'Dungeons')
    await searchResults.clickOnMostSold()
    await productPage.cartButtonClick()
    await addToCart.goToCartClick()

    const removeButton = page
        .getByRole('link', { name: /Eliminar/i })
        .or(page.getByRole('button', { name: /Eliminar/i }))
        .first()
    await expect(removeButton).toBeVisible()
    await removeButton.click()

    const cartCount = page.locator('#nav-cart-count')
    await expect(cartCount).toHaveText('0')
})

// Suggested (not implemented — requires authentication):
// A logged-in checkout test using credentials from .env and a LoginPage page object,
// gated with test.skip(!process.env.AMAZON_USER) so it is skipped without credentials.
