# Merge Report

This repository combines the original handwritten-note knowledge base with the second Markdown-course archive.

## Merge rules

- Kept the original 14-section knowledge-base structure as the backbone.
- Merged course notes by subject instead of preserving duplicate course folders.
- Split the previously small testing and TanStack Query sections into deeper topic files.
- Corrected outdated material instead of blindly copying it.
- Added missing bridge topics such as query keys, mutations/invalidation, optimistic updates, custom render utilities, accessibility testing, E2E strategy, and request race conditions.

## Important corrections

1. The old `@mswjs/data` package is deprecated; the maintained package is `@msw/data`.
2. React 18 removed the old "setState on unmounted component" warning; request cancellation is still useful, but that warning should not be taught as the reason every async request must be aborted.
3. A generic `useData<T>` hook with changing endpoint/filter inputs must model those dependencies; `[]` is not correct when external inputs can change.
4. Grouping related state into one object is a design option, not a universal rule; URL state, reducer state, server state, and separate local state may be more appropriate.
5. The empty `Why-React-Query.md` has been replaced with an actual server-state/caching explanation.

## Source → destination mapping

- `JS testing/aaa-pattern-arrange-act-assert.md` → `11-testing/testing-fundamentals.md`
- `JS testing/boundary-testing.md` → `11-testing/testing-fundamentals.md`
- `JS testing/clearing-resetting-restoring-mocks.md` → `11-testing/mocking.md`
- `JS testing/defensive-programming-and-parameterized-tests.md` → `11-testing/testing-fundamentals.md`
- `JS testing/false-positives-false-negatives-and-tdd.md` → `11-testing/test-quality-and-tdd.md`
- `JS testing/interaction-testing.md` → `11-testing/spies-and-interaction-testing.md`
- `JS testing/javascript-testing-tools-overview.md` → `11-testing/testing-strategy-and-pyramid.md`
- `JS testing/maintainable-and-robust-tests.md` → `11-testing/test-quality-and-tdd.md`
- `JS testing/mock-functions-in-vitest.md` → `11-testing/mocking.md`
- `JS testing/mocking-dates-in-vitest.md` → `11-testing/fake-timers-and-dates.md`
- `JS testing/mocking-modules-in-vitest.md` → `11-testing/mocking.md`
- `JS testing/partial-mocking.md` → `11-testing/mocking.md`
- `JS testing/positive-and-negative-testing.md` → `11-testing/testing-fundamentals.md`
- `JS testing/setup-and-teardown-in-vitest.md` → `11-testing/vitest.md`
- `JS testing/spying-in-vitest.md` → `11-testing/spies-and-interaction-testing.md`
- `JS testing/testing-asynchronous-code.md` → `11-testing/async-testing.md`
- `JS testing/types-of-tests-and-testing-pyramid.md` → `11-testing/testing-strategy-and-pyramid.md`
- `JS testing/unit-testing-introduction.md` → `11-testing/testing-fundamentals.md`
- `JS testing/vitest-matchers-reference.md` → `11-testing/vitest.md`
- `game hub/abort-controller.md` → `10-data-fetching/abort-controller.md`
- `game hub/custom-hooks.md` → `03-react/custom-hooks.md`
- `game hub/generics-and-data-fetching-hook.md` → `02-typescript/generics-and-advanced-types.md` (referenced from `10-data-fetching/fetch.md`)
- `game hub/lifting-state-up-and-state-objects.md` → `03-react/lifting-state-and-state-design.md`
- `game hub/ts-index-signatures.md` → `02-typescript/index-signatures-and-record.md`
- `react course part 2/Configuring-React-Query.md` → `10-data-fetching/query-caching-and-defaults.md`
- `react course part 2/Creating-Custom-Query-Hooks.md` → `10-data-fetching/tanstack-query-fundamentals.md`
- `react course part 2/Fetching-Data-with-useQuery.md` → `10-data-fetching/tanstack-query-fundamentals.md`
- `react course part 2/Why-React-Query.md` → `empty source; replaced by explanation in tanstack-query-fundamentals.md`
- `react testing/Testing_Components_with_Asynchronous_Data.md` → `11-testing/async-react-testing.md`
- `react testing/Testing_ProductForm_Validation_and_Submission.md` → `11-testing/forms-testing.md`
- `react testing/component-rendering-tests.md` → `11-testing/react-testing-library.md`
- `react testing/conditional-rendering-and-query-methods.md` → `11-testing/react-testing-library.md`
- `react testing/mock-service-worker-msw.md` → `11-testing/msw.md`
- `react testing/msw-data-and-fakerjs.md` → `11-testing/msw.md (deprecated API replaced, not copied verbatim)`
- `react testing/testing-api-responses-and-not-found-states.md` → `11-testing/async-react-testing.md`
- `react testing/testing-asynchronous-ui-and-waitfor.md` → `11-testing/async-react-testing.md`
- `react testing/testing-callback-functions-and-user-typing.md` → `11-testing/user-event-and-state-transitions.md`
- `react testing/testing-lists-and-links.md` → `11-testing/react-testing-library.md`
- `react testing/testing-loading-and-error-states.md` → `11-testing/async-react-testing.md`
- `react testing/testing-null-rendering-and-multiple-elements.md` → `11-testing/react-testing-library.md`
- `react testing/testing-philosophy.md` → `11-testing/react-testing-library.md`
- `react testing/testing-react-query-components.md` → `11-testing/react-query-testing.md`
- `react testing/testing-state-transitions-and-toggle-behavior.md` → `11-testing/user-event-and-state-transitions.md`
- `react testing/testing-user-interactions-with-userevent.md` → `11-testing/user-event-and-state-transitions.md`

## Source archive inventory

- Markdown files: **48**
- Non-empty Markdown files: **47**
- Non-empty content files excluding course READMEs: **43**
- Course README files were replaced by the unified repository navigation.
