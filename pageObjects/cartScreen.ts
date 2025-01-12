import { expect, type Locator, type Page } from '@playwright/test'

export class CartScreen {

    readonly page: Page
    readonly payButton: Locator

    constructor(page: Page) {
        this.page = page
        this.payButton = page.getByRole('button', { name: "Proceder al pago" })
    }

    async payButtonClick() {
        await this.payButton.click()
    }
}