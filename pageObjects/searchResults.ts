import { expect, type Locator, type Page } from '@playwright/test'

export class SearchResults {

    readonly page: Page
    readonly bestSellerCard: Locator
    readonly bestSellerBadge: Locator
    readonly bestSellerProductLink: Locator
    readonly firstProductLink: Locator


    constructor(page: Page) {
        this.page = page
        const searchResultCards = page.locator('div[data-component-type="s-search-result"]')
        this.bestSellerCard = searchResultCards
            .filter({ hasText: /Más vendido/i })
            .first()
        this.bestSellerBadge = this.bestSellerCard.getByText('Más vendido', { exact: true })
        this.bestSellerProductLink = this.bestSellerCard
            .locator('a:has(h2.a-size-base-plus)')
            .first()
        this.firstProductLink = searchResultCards
            .first()
            .locator('a:has(h2.a-size-base-plus)')
            .first()
    }

    async clickOnMostSold() {
        await expect(this.bestSellerBadge).toBeVisible()
        await expect(this.bestSellerProductLink).toBeVisible()
        await this.bestSellerProductLink.click()
    }

    async clickFirstProduct() {
        await expect(this.firstProductLink).toBeVisible()
        await this.firstProductLink.click()
    }
}
