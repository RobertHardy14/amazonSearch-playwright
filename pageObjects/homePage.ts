import { expect, type Locator, type Page } from '@playwright/test'

export class HomePage {

    readonly page: Page
    readonly searchBar: Locator

    constructor(page: Page) {

        this.page = page
        this.searchBar = page.getByPlaceholder('Buscar en Amazon.com.mx')
    }

    async gotoAmazon() {
        await this.page.goto('/')

        const botCheck = this.page.getByText(/detectado un acceso automatizado|robot|CAPTCHA/i)
        if (await botCheck.count() > 0) {
            throw new Error('Amazon returned a bot/CAPTCHA check. The test cannot continue.')
        }

        await expect(this.searchBar).toBeVisible()
    }

    async clickOnSearch() {
        await this.searchBar.click()
    }

    async typeOnSearch(toSearch: string) {
        await this.searchBar.fill(toSearch)
    }

    async submitSearch() {
        await this.searchBar.press('Enter')
    }

    async selectFirstAutocomplete() {
        const dropdown = this.page.locator('.two-pane-results-container')
        await expect(dropdown).toBeVisible()
        await this.page.locator('#sac-suggestion-row-1').getByRole('gridcell').click()
    }
}
