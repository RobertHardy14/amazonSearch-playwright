import { expect, type Locator, type Page } from '@playwright/test'

export class HomePage {

    readonly page: Page
    readonly searchBar: Locator

    constructor(page: Page) {

        this.page = page
        this.searchBar = page.getByPlaceholder('Buscar en Amazon.com.mx')
    }

    async gotoAmazon() {
        await this.page.goto('https://www.amazon.com.mx/')
        expect(this.page).toHaveTitle(/Amazon.com.mx/)
    }

    async clickOnSearch() {
        await this.searchBar.click()
    }

    async typeOnSearch(toSearch: string) {
        await this.searchBar.fill(toSearch)
    }

    async selectFirstAutocomplete() {
        await this.page.locator('.two-pane-results-container').getByRole('rowgroup')
        await this.page.locator('#sac-suggestion-row-1').getByRole('gridcell').click()
    }
}