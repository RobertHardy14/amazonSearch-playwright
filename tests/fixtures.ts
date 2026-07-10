import { test as base } from '@playwright/test'
import { HomePage } from '../pageObjects/homePage'
import { SearchResults } from '../pageObjects/searchResults'
import { ProductPage } from '../pageObjects/productPage'
import { AddToCart } from '../pageObjects/addToCart'
import { CartScreen } from '../pageObjects/cartScreen'

type Pages = {
    homePage: HomePage
    searchResults: SearchResults
    productPage: ProductPage
    addToCart: AddToCart
    cartScreen: CartScreen
}

export const test = base.extend<Pages>({
    homePage: async ({ page }, use) => use(new HomePage(page)),
    searchResults: async ({ page }, use) => use(new SearchResults(page)),
    productPage: async ({ page }, use) => use(new ProductPage(page)),
    addToCart: async ({ page }, use) => use(new AddToCart(page)),
    cartScreen: async ({ page }, use) => use(new CartScreen(page)),
})

export { expect } from '@playwright/test'

export async function searchFor(homePage: HomePage, term: string) {
    await homePage.gotoAmazon()
    await homePage.clickOnSearch()
    await homePage.typeOnSearch(term)
    await homePage.selectFirstAutocomplete()
}
