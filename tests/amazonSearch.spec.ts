import { test } from '@playwright/test'
import { HomePage } from '../pageObjects/homePage'
import { SearchResults } from '../pageObjects/searchResults'
import { ProductPage } from '../pageObjects/productPage'
import { AddToCart } from '../pageObjects/addToCart'
import { CartScreen } from '../pageObjects/cartScreen'

test('Search on Amazon', async ({ page }) => {
    const homePage = new HomePage(page)

    await homePage.gotoAmazon()
    await homePage.clickOnSearch()
    await homePage.typeOnSearch('Dungeons')
    await homePage.selectFirstAutocomplete()
})

test('Search and click on Best Seller', async ({ page }) => {
    const homePage = new HomePage(page)
    const searchResults = new SearchResults(page)

    await homePage.gotoAmazon()
    await homePage.clickOnSearch()
    await homePage.typeOnSearch('Dungeons')
    await homePage.selectFirstAutocomplete()
    await searchResults.clickOnMostSold()
})

test('Search, click on best seller, add to cart', async ({ page }) => {
    const homePage = new HomePage(page)
    const searchResults = new SearchResults(page)
    const productPage = new ProductPage(page)

    await homePage.gotoAmazon()
    await homePage.clickOnSearch()
    await homePage.typeOnSearch('Dungeons')
    await homePage.selectFirstAutocomplete()
    await searchResults.clickOnMostSold()
    await productPage.cartButtonClick()
})

test('Search, bestseller, add to cart, go to cart', async ({ page }) => {
    const homePage = new HomePage(page)
    const searchResults = new SearchResults(page)
    const productPage = new ProductPage(page)
    const addToCart = new AddToCart(page)

    await homePage.gotoAmazon()
    await homePage.clickOnSearch()
    await homePage.typeOnSearch('Dungeons')
    await homePage.selectFirstAutocomplete()
    await searchResults.clickOnMostSold()
    await productPage.cartButtonClick()
    await addToCart.goToCartClick()
})

test('All of the above, and proceed to payment', async ({ page }) => {
    const homePage = new HomePage(page)
    const searchResults = new SearchResults(page)
    const productPage = new ProductPage(page)
    const addToCart = new AddToCart(page)
    const payButton = new CartScreen(page)

    await homePage.gotoAmazon()
    await homePage.clickOnSearch()
    await homePage.typeOnSearch('Dungeons')
    await homePage.selectFirstAutocomplete()
    await searchResults.clickOnMostSold()
    await productPage.cartButtonClick()
    await addToCart.goToCartClick()
    await payButton.payButtonClick()
})