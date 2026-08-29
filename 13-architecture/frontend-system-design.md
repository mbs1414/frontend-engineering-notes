# Frontend System Design

## Answering framework

For any system-design problem discuss:

1. requirements
2. component/module boundaries
3. state ownership
4. API/data model
5. caching
6. loading/error/empty states
7. performance
8. accessibility
9. security
10. testing
11. observability
12. failure/retry behavior

## Example: autocomplete

Requirements:

- type a query
- fast results
- keyboard support
- loading/error/empty states
- stale responses must not overwrite newer results

Possible flow:

```text
Input state
  ↓ debounce
Query/request
  ↓ cancellation/deduplication
Cache
  ↓
Accessible combobox/listbox
```

Discuss:

- minimum query length
- debounce delay
- AbortController
- query caching
- ArrowUp/ArrowDown/Enter/Escape
- focus/ARIA semantics
- virtualization only if result sets are genuinely large

## Example: data table

Consider:

- server vs client sorting
- pagination
- filtering
- selection
- row identity
- virtualization
- sticky headers
- column resizing
- URL synchronization
- query caching
- accessible table/sort semantics

## Practice prompts

- DevLens/API client
- chat
- file uploader
- admin dashboard
- notification system
- infinite feed
- authentication/session flow

## Interview questions

1. Server vs client pagination?
2. How prevent stale autocomplete results?
3. What table state belongs in the URL?
4. When virtualize?
