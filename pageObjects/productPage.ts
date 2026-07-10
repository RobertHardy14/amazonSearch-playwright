import { expect, type Locator, type Page } from '@playwright/test'

export class ProductPage {

    readonly page: Page
    readonly addToCard: Locator

    constructor(page: Page) {
        this.page = page
        this.addToCard = page.getByRole('button', { name: "Agregar al Carrito" })
    }

    async cartButtonClick() {
        await expect(this.addToCard).toBeVisible()
        await this.addToCard.click()
        await expect(this.page.getByText('Agregado al carrito')).toBeVisible()
    }
}
