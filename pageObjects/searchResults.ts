import { expect, type Locator, type Page } from '@playwright/test'

export class SearchResults {

    readonly page: Page
    readonly sResultsMostSold: Locator


    constructor(page: Page) {
        this.page = page
        this.sResultsMostSold = page.getByText('Más vendido', { exact: true }).locator('xpath=following::img[1]')
    }

    async clickOnMostSold() {
        await this.sResultsMostSold.click()
    }
}