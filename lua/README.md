# KeanuWhoa Lua SDK



The Lua SDK for the KeanuWhoa API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Whoa()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/keanu-whoa-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("keanu-whoa_sdk")

local client = sdk.new()
```

### 2. List whoa records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local whoas, err = client:Whoa():list()
if err then error(err) end

for _, item in ipairs(whoas) do
  print(item["id"], item["1080p"])
end
```

### 3. Load a whoa

```lua
local whoa, err = client:Whoa():load({ id = 1 })
if err then error(err) end
print(whoa)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local whoas, err = client:Whoa():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Whoa():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
KEANU_WHOA_TEST_LIVE=TRUE
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### KeanuWhoaSDK

```lua
local sdk = require("keanu-whoa_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### KeanuWhoaSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Whoa` | `(data) -> WhoaEntity` | Create a Whoa entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local whoa, err = client:Whoa():load({ id = "example_id" })
    if err then error(err) end
    -- whoa is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Operations: List, Load.

API path: `/whoas`



## Entities


### Whoa

Create an instance: `local whoa = client:Whoa(nil)`

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
| `video` | `table` |  |
| `whoa_in_movie` | `string` | Representation of whoa count in the movie (e.g., '1 of 5') |
| `year` | `number` | Year the movie was released |

#### Example: Load

```lua
local whoa, err = client:Whoa():load({ id = 1 })
```

#### Example: List

```lua
local whoas, err = client:Whoa():list()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── keanu-whoa_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`keanu-whoa_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local whoa = client:Whoa()
whoa:list()

-- whoa:data_get() now returns the whoa data from the last list
-- whoa:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
