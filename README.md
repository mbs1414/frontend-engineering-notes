# Frontend Engineering Notes

A structured frontend engineering knowledge base built from my original handwritten notes **plus the later Markdown course notes**, corrected and expanded for production knowledge and frontend interviews.

The goal is not to memorize framework APIs. The goal is to understand how JavaScript, React, TypeScript, the browser, networking, performance, data fetching, testing, security, accessibility, algorithms, and architecture fit together.

- [Study roadmap](./ROADMAP.md)
- [Original-note corrections](./NOTES-MIGRATION.md)
- [Second archive merge report](./MERGE-REPORT.md)

## Recommended study order

1. [JavaScript](#01-javascript)
2. [React](#03-react)
3. [Browser internals](#05-browser)
4. [Networking](#06-network)
5. [Performance](#04-performance)
6. [TypeScript](#02-typescript)
7. [Data fetching & server state](#10-data-fetching)
8. [Testing](#11-testing)
9. [Algorithms & Data Structures](#12-algorithms--data-structures)
10. [HTML & CSS](#07-html--css)
11. [Security](#09-security)
12. [Accessibility](#08-accessibility)
13. [Architecture & system design](#13-architecture)
14. [Build tools](#14-build-tools)

## 01. JavaScript

- [Fundamentals](./01-javascript/fundamentals.md)
- [Scope, Hoisting, TDZ & Closures](./01-javascript/scope-closure-hoisting.md)
- [Execution Context & Call Stack](./01-javascript/execution-context.md)
- [Event Loop](./01-javascript/event-loop.md)
- [Async JavaScript](./01-javascript/async-javascript.md)
- [`this` & Functions](./01-javascript/this-and-functions.md)
- [Prototypes & Classes](./01-javascript/prototype-and-classes.md)
- [Memory & Garbage Collection](./01-javascript/memory-and-garbage-collection.md)

## 02. TypeScript

- [Fundamentals](./02-typescript/fundamentals.md)
- [Narrowing & Type Guards](./02-typescript/narrowing-and-type-guards.md)
- [Generics & Advanced Types](./02-typescript/generics-and-advanced-types.md)
- [Index Signatures & Record](./02-typescript/index-signatures-and-record.md)

## 03. React

- [Rendering](./03-react/rendering.md)
- [State](./03-react/state.md)
- [Lifting State & State Design](./03-react/lifting-state-and-state-design.md)
- [Reconciliation & Keys](./03-react/reconciliation-and-keys.md)
- [Effects](./03-react/effects.md)
- [Refs](./03-react/refs.md)
- [Hooks Mental Model](./03-react/hooks.md)
- [Custom Hooks](./03-react/custom-hooks.md)
- [Context & State Management](./03-react/context-and-state-management.md)
- [Suspense & Concurrent React](./03-react/suspense-and-concurrent-react.md)
- [React Compiler & Modern APIs](./03-react/react-compiler-and-modern-apis.md)

## 04. Performance

- [Performance Fundamentals](./04-performance/performance-fundamentals.md)
- [React Performance](./04-performance/react-performance.md)
- [Browser Rendering Performance](./04-performance/browser-rendering.md)
- [Core Web Vitals](./04-performance/core-web-vitals.md)
- [Network & Bundle Performance](./04-performance/network-and-bundle-performance.md)
- [Images, Fonts & Assets](./04-performance/images-fonts-assets.md)

## 05. Browser

- [Browser Architecture](./05-browser/browser-architecture.md)
- [DOM & Events](./05-browser/dom-and-events.md)
- [Rendering Pipeline](./05-browser/rendering-pipeline.md)
- [Storage & Browser APIs](./05-browser/storage-and-browser-apis.md)

## 06. Network

- [HTTP](./06-network/http.md)
- [HTTP Caching](./06-network/http-caching.md)
- [CORS](./06-network/cors.md)
- [Cookies & Authentication](./06-network/cookies-and-auth.md)
- [WebSocket, SSE, DNS, TCP & TLS](./06-network/realtime-and-network-basics.md)

## 07. HTML & CSS

- [HTML & Semantics](./07-html-css/html.md)
- [CSS Core](./07-html-css/css-core.md)
- [Flexbox & Grid](./07-html-css/flexbox-and-grid.md)
- [Responsive Design & Stacking Context](./07-html-css/responsive-and-stacking.md)

## 08. Accessibility

- [Accessibility Fundamentals](./08-accessibility/accessibility.md)

## 09. Security

- [Frontend Security](./09-security/frontend-security.md)
- [XSS & CSRF](./09-security/xss-and-csrf.md)
- [Authentication & Token Storage](./09-security/authentication-security.md)

## 10. Data Fetching

- [Fetch Fundamentals](./10-data-fetching/fetch.md)
- [AbortController & Cancellation](./10-data-fetching/abort-controller.md)
- [Race Conditions & Cancellation](./10-data-fetching/race-conditions-and-cancellation.md)
- [Server State](./10-data-fetching/server-state.md)
- [TanStack Query Fundamentals](./10-data-fetching/tanstack-query-fundamentals.md)
- [Query Keys & Options](./10-data-fetching/query-keys-and-options.md)
- [Caching, Freshness & Defaults](./10-data-fetching/query-caching-and-defaults.md)
- [Mutations & Invalidation](./10-data-fetching/mutations-and-invalidation.md)
- [Optimistic Updates](./10-data-fetching/optimistic-updates.md)
- [Pagination & Infinite Queries](./10-data-fetching/pagination-and-infinite-queries.md)
- [Prefetching & Router Integration](./10-data-fetching/prefetching-and-router-integration.md)

## 11. Testing

This became one of the deepest sections after the second archive merge.

- [Testing Fundamentals](./11-testing/testing-fundamentals.md)
- [Testing Strategy: Pyramid, Trophy & Tooling](./11-testing/testing-strategy-and-pyramid.md)
- [Vitest](./11-testing/vitest.md)
- [Mocking](./11-testing/mocking.md)
- [Spies & Interaction Testing](./11-testing/spies-and-interaction-testing.md)
- [Fake Timers & Dates](./11-testing/fake-timers-and-dates.md)
- [Async JavaScript Testing](./11-testing/async-testing.md)
- [Test Quality & TDD](./11-testing/test-quality-and-tdd.md)
- [React Testing Library](./11-testing/react-testing-library.md)
- [userEvent & State Transitions](./11-testing/user-event-and-state-transitions.md)
- [Async React Testing](./11-testing/async-react-testing.md)
- [MSW](./11-testing/msw.md)
- [Form Testing](./11-testing/forms-testing.md)
- [TanStack Query Component Testing](./11-testing/react-query-testing.md)
- [Custom Render Utilities](./11-testing/custom-render-utils.md)
- [Accessibility Testing](./11-testing/accessibility-testing.md)
- [E2E Testing with Playwright](./11-testing/e2e-testing.md)

## 12. Algorithms & Data Structures

- [Big O](./12-algorithms/big-o.md)
- [Arrays, Strings, Map & Set](./12-algorithms/arrays-strings-map-set.md)
- [Stack, Queue & Recursion](./12-algorithms/stack-queue-recursion.md)
- [Searching, Sorting & Common Patterns](./12-algorithms/searching-sorting-patterns.md)
- [Trees & Graphs](./12-algorithms/trees-and-graphs.md)
- [Frontend Coding Exercises](./12-algorithms/frontend-coding-exercises.md)

## 13. Architecture

- [Frontend Architecture](./13-architecture/frontend-architecture.md)
- [Rendering Strategies](./13-architecture/rendering-strategies.md)
- [BFF](./13-architecture/bff.md)
- [Microfrontends](./13-architecture/microfrontends.md)
- [Frontend System Design](./13-architecture/frontend-system-design.md)

## 14. Build Tools

- [Build Process & Vite](./14-build-tools/build-process-and-vite.md)
- [Bundling & Tree Shaking](./14-build-tools/bundling-and-tree-shaking.md)
- [ESM vs CommonJS](./14-build-tools/esm-commonjs.md)

## Interview Practice

- [JavaScript Questions](./interview/javascript-questions.md)
- [React Questions](./interview/react-questions.md)
- [Frontend Questions](./interview/frontend-questions.md)
- [Coding Problems](./interview/coding-problems.md)

## Performance rule

> Measure → find the bottleneck → understand the cause → optimize → measure again.

Do not optimize because a hook exists. The frontend ecosystem already provides quite enough ceremonial complexity.
