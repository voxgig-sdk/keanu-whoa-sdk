# KeanuWhoa TypeScript SDK



The TypeScript SDK for the KeanuWhoa API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Whoa()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/keanu-whoa-sdk/releases](https://github.com/voxgig-sdk/keanu-whoa-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { KeanuWhoaSDK } from '@voxgig-sdk/keanu-whoa'

const client = new KeanuWhoaSDK()
```

### 2. List whoa records

`list()` resolves to an array of Whoa ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const whoas = await client.Whoa().list()

for (const whoa of whoas) {
  console.log(whoa)
}
```

### 3. Load a whoa

`load()` returns the entity directly and throws on failure:

```ts
try {
  const whoa = await client.Whoa().load({ id: 1 })
  console.log(whoa)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const whoas = await client.Whoa().list()
  console.log(whoas)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = KeanuWhoaSDK.test()

const whoa = await client.Whoa().list()
// whoa is the entity, populated with mock response data
// — call whoa.data() for the record itself
console.log(whoa)
```

You can also use the instance method:

```ts
const client = new KeanuWhoaSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Whoa()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new KeanuWhoaSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
KEANU_WHOA_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### KeanuWhoaSDK

#### Constructor

```ts
new KeanuWhoaSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Whoa(data?)` | `WhoaEntity` | Create a Whoa entity instance. |
| `tester(testopts?, sdkopts?)` | `KeanuWhoaSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `KeanuWhoaSDK.test(testopts?, sdkopts?)` | `KeanuWhoaSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): KeanuWhoaSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Whoa

| Field | Description |
| --- | --- |
| `1080p` | URL to 1080p video clip |
| `360p` | URL to 360p video clip |
| `480p` | URL to 480p video clip |
| `720p` | URL to 720p video clip |
| `audio` | URL to audio clip of the whoa |
| `character` | Character name that Keanu Reeves played |
| `current_whoa_in_movie` | The number of this whoa within the movie |
| `director` | Director of the movie |
| `full_line` | The full line of dialogue containing the whoa |
| `id` | Unique identifier for the whoa instance |
| `movie` | Title of the movie where the whoa was said |
| `movie_duration` | Total duration of the movie |
| `poster` | URL to movie poster image |
| `timestamp` | Timestamp when the whoa occurs in the movie |
| `total_whoas_in_movie` | Total number of whoas in the movie |
| `video` |  |
| `whoa_in_movie` | Representation of whoa count in the movie (e.g., '1 of 5') |
| `year` | Year the movie was released |

Operations: list, load.

API path: `/whoas`



## Entities


### Whoa

Create an instance: `const whoa = client.Whoa()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `1080p` | `string` | URL to 1080p video clip |
| `360p` | `string` | URL to 360p video clip |
| `480p` | `string` | URL to 480p video clip |
| `720p` | `string` | URL to 720p video clip |
| `audio` | `string` | URL to audio clip of the whoa |
| `character` | `string` | Character name that Keanu Reeves played |
| `current_whoa_in_movie` | `number` | The number of this whoa within the movie |
| `director` | `string` | Director of the movie |
| `full_line` | `string` | The full line of dialogue containing the whoa |
| `id` | `number` | Unique identifier for the whoa instance |
| `movie` | `string` | Title of the movie where the whoa was said |
| `movie_duration` | `string` | Total duration of the movie |
| `poster` | `string` | URL to movie poster image |
| `timestamp` | `string` | Timestamp when the whoa occurs in the movie |
| `total_whoas_in_movie` | `number` | Total number of whoas in the movie |
| `video` | `Record<string, any>` |  |
| `whoa_in_movie` | `string` | Representation of whoa count in the movie (e.g., '1 of 5') |
| `year` | `number` | Year the movie was released |

#### Example: Load

```ts
const whoa = await client.Whoa().load({ id: 1 })
```

#### Example: List

```ts
const whoas = await client.Whoa().list()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
keanu-whoa/
├── src/
│   ├── KeanuWhoaSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { KeanuWhoaSDK } from '@voxgig-sdk/keanu-whoa'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const whoa = client.Whoa()
await whoa.list()

// whoa.data() now returns the whoa data from the last `list`
// whoa.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
