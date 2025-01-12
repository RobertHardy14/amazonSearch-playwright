import { expect, type Locator, type Page } from '@playwright/test'

export class AddToCart {
    readonly page: Page
    readonly goToCart: Locator

    constructor(page: Page) {
        this.page = page
        this.goToCart = page.getByText('Ir al Carrito')
    }

    async goToCartClick() {
        await this.goToCart.first().click()
    }
}