import { expect, type Locator, type Page } from '@playwright/test'

export class SearchResults {

    readonly page: Page
    readonly sResultsMostSold: Locator


    constructor(page: Page) {
        this.page = page
        this.sResultsMostSold = page
            .locator('div[data-component-type="s-search-result"], div.s-result-item')
            .filter({ hasText: 'Más vendido' })
            .first()
            .getByRole('link')
            .first()
    }

    async clickOnMostSold() {
        await expect(this.sResultsMostSold).toBeVisible()
        await this.sResultsMostSold.click()
    }
}
