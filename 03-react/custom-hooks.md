# Custom Hooks

A custom hook extracts reusable **stateful behavior**. It does not automatically create shared state between callers.

Good custom hooks often encapsulate one coherent concern: a subscription, reusable interaction state, a query, a browser API integration, or a domain workflow.

## Custom hook vs normal utility function

Use a custom hook when the reusable logic itself needs React hooks. Use a normal function for pure computation.

```ts
function formatPrice(value: number) {
  return new Intl.NumberFormat().format(value);
}
```

There is no reason to turn pure computation into a hook merely because the project contains React.

## Design guidelines

- Follow the Rules of Hooks.
- Keep the public API small and domain-oriented.
- Return values/actions that callers need, not every internal implementation detail.
- Avoid hiding surprising global side effects.
- Compose hooks instead of building one gigantic hook that becomes a small government agency.
- Treat stale closures and effect dependencies as part of the hook's correctness.

## Course notes: Movie Hub Custom Hook

### Overview

Movie Hub is a React + TypeScript application inspired by Mosh Hamedani's Game Hub project.

Instead of displaying video games, this application displays movie information fetched from an API.

The goal of this project is to practice:

* React fundamentals
* TypeScript
* Custom Hooks
* API Integration
* State Management
* Component Composition
* Clean Project Structure

---

## Project Structure

```text
src/
├── components/
├── hooks/
│   └── useMovies.ts
├── services/
│   └── api-client.ts
├── pages/
├── types/
└── App.tsx
```

---

## Custom Hook: useMovies

### Purpose

The `useMovies` hook encapsulates all movie-fetching logic.

Benefits:

* Separates API logic from UI components
* Makes components cleaner
* Encourages reusability
* Follows React's custom hook pattern

---

### Code

```tsx
const { movies, error } = useMovies();
```

The hook returns:

| Property | Description                    |
| -------- | ------------------------------ |
| movies   | Array of fetched movies        |
| error    | Error message if request fails |

---

## Understanding the Hook

### State Management

```tsx
const [movies, setMovies] = useState<Movie[]>([]);
```

Stores all fetched movies.

Initial value:

```tsx
[]
```

because data has not yet been loaded.

---

```tsx
const [error, setError] = useState("");
```

Stores any API error message.

Example:

```text
Network Error
```

or

```text
404 Not Found
```

---

### Side Effect

```tsx
useEffect(() => {
  ...
}, []);
```

The empty dependency array means:

```text
Run only once when the component mounts.
```

This is ideal for initial data fetching.

---

### API Request

```tsx
apiClient.get<Movie[]>("data")
```

Requests movie data from the endpoint.

Expected response:

```json
[
  {
    "id": "1",
    "title": "Inception",
    "poster": "image-url",
    "year": "2010",
    "country": "USA",
    "imdb_rating": "8.8",
    "genres": ["Action", "Sci-Fi"]
  }
]
```

---

### Success Flow

```tsx
.then((res) => {
  setMovies(res.data);
})
```

When the request succeeds:

1. Receive response
2. Extract data
3. Update movies state
4. Trigger re-render

---

### Error Flow

```tsx
.catch((error) => {
  setError(error.message);
})
```

When request fails:

1. Capture error
2. Store error message
3. Display feedback to user

---

## Usage Example

```tsx
function MovieGrid() {
  const { movies, error } = useMovies();

  if (error) return <p>{error}</p>;

  return (
    <>
      {movies.map(movie => (
        <div key={movie.id}>
          {movie.title}
        </div>
      ))}
    </>
  );
}
```

---

## Future Improvements

### Loading State

Current hook lacks loading support.

Add:

```tsx
const [loading, setLoading] = useState(false);
```

Example:

```tsx
const { movies, error, loading } = useMovies();
```

Usage:

```tsx
if (loading) return <Spinner />;
```

---

### Search Movies

Create:

```tsx
useMovieSearch()
```

Features:

* Search by title
* Debounced input
* API filtering

---

### Genre Filtering

Example:

```tsx
const actionMovies = movies.filter(movie =>
  movie.genres.includes("Action")
);
```

---

### Sorting

Possible options:

* IMDb Rating
* Release Year
* Title (A-Z)

---

### Pagination

Future API requests:

```tsx
/api/movies?page=2
```

Benefits:

* Better performance
* Reduced network traffic
* Improved user experience

---

## Key Learning

A custom hook allows us to:

* Reuse logic
* Keep components focused on UI
* Separate concerns
* Improve maintainability

The UI should care about displaying movies.

The hook should care about fetching movies.

## Interview questions

1. Does a custom hook share state between callers?
2. Custom hook vs utility function?
3. What makes a custom hook API maintainable?
4. Why can stale closures appear inside hooks?
