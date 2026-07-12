# Amazon Search — Playwright E2E Tests

End-to-end tests for the search-to-cart flow on [amazon.com.mx](https://www.amazon.com.mx), built with Playwright and TypeScript using the Page Object Model.

## Tech Stack

- [Playwright](https://playwright.dev/) `^1.49.1`
- TypeScript

## Project Structure

```
pageObjects/    # Page Object Model classes (home, search results, product, cart, add-to-cart)
tests/
  fixtures.ts          # Custom fixtures wiring up page objects + a searchFor() helper
  amazonSearch.spec.ts # Test cases
```

## Getting Started

```bash
npm install
npx playwright install
```

## Running Tests

```bash
npx playwright test           # run all tests (headless, chromium)
npx playwright test --headed  # run with a visible browser
npx playwright show-report    # view the last HTML report
```

## Test Coverage

- Basic product search
- Clicking a best-seller result
- Add to cart / navigate to cart
- Cart badge count updates
- Product page shows title and price
- Invalid search shows "no results" message
- Removing an item empties the cart

## Notes

- Tests run against the live `amazon.com.mx` site (`baseURL` set in `playwright.config.ts`) — no test fixtures/mocking.
- Chromium is the only enabled project; other browsers are commented out in the config.
- `homePage.ts` includes a guard for bot/CAPTCHA detection on navigation.
- An authenticated checkout flow is planned but not yet implemented (see the commented-out test in `amazonSearch.spec.ts`, gated on an `AMAZON_USER` env var).
