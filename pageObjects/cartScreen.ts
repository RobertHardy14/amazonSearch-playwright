import { expect, type Locator, type Page } from '@playwright/test'

export class CartScreen {

    readonly page: Page
    readonly payButton: Locator
    readonly removeItemButton: Locator

    constructor(page: Page) {
        this.page = page
        this.payButton = page.getByRole('button', { name: "Proceder al pago" })
        this.removeItemButton = page
            .locator('#activeCartViewForm [data-itemtype="active"]')
            .first()
            .locator('input[data-action="delete-active"][data-feature-id="item-delete-button"]')
    }

    async payButtonClick() {
        await this.payButton.click()
    }

    async removeItemButtonClick() {
        await expect(this.removeItemButton).toBeVisible()
        await this.removeItemButton.click()
    }
}