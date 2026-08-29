# End-to-End Testing with Playwright

E2E tests exercise the application in a real browser and are best reserved for high-value cross-system flows.

## Good candidates

- authentication/login/logout
- critical create/edit/delete workflow
- routing and permissions
- checkout/payment initiation
- file upload/download flows
- browser behavior that JSDOM cannot model reliably

## Playwright concepts to know

- locators, especially role-based locators
- auto-waiting
- browser contexts
- fixtures
- network interception when appropriate
- screenshots/traces on failure
- parallelism
- projects/browsers

## Avoid duplicate coverage

Do not recreate every component test as E2E. Use E2E for risks that require the browser/system boundary.

## Flakiness rules

Avoid fixed sleeps. Wait for a real UI/network condition. Keep tests isolated and make test data creation deterministic.
