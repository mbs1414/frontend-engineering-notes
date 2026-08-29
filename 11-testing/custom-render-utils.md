# Custom Render Utilities

Real components often depend on providers: QueryClient, router, theme, authentication/context, feature flags, etc.

Create a test render helper that mirrors the providers actually needed without hiding too much magic.

```tsx
function renderApp(ui: React.ReactNode, options = {}) {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <AppProviders>{ui}</AppProviders>
    </QueryClientProvider>
  );
}
```

## Principles

- fresh mutable providers/cache per test
- accept route/initial state only when tests need it
- return the `user` instance when convenient
- keep the helper transparent enough that failures remain understandable
- do not use one enormous helper that silently boots your entire production platform

## Router testing

For React Router or TanStack Router, use an in-memory history/router and assert navigation through rendered behavior/URL state rather than mocking navigation functions by default.
