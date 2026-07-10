import { expect, type Locator, type Page } from '@playwright/test'

export class AddToCart {
    readonly page: Page
    readonly goToCart: Locator

    constructor(page: Page) {
        this.page = page
        this.goToCart = page.getByRole('link', { name: 'Ir al Carrito' })
    }

    async goToCartClick() {
        await expect(this.goToCart.first()).toBeVisible()
        await this.goToCart.first().click()
    }
}
