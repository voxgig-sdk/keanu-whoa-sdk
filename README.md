# KeanuWhoa SDK



Available for [Golang](go/) and [Go CLI](go-cli/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Whoa** |  | `/whoas` |

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/keanu-whoa-sdk/go"

client := sdk.NewKeanuWhoaSDK(map[string]any{
    "apikey": os.Getenv("KEANU-WHOA_APIKEY"),
})

// List all whoas
whoas, err := client.Whoa(nil).List(nil, nil)
```

### Lua

```lua
local sdk = require("keanu-whoa_sdk")

local client = sdk.new({
  apikey = os.getenv("KEANU-WHOA_APIKEY"),
})

-- List all whoas
local whoas, err = client:Whoa(nil):list(nil, nil)

-- Load a specific whoa
local whoa, err = client:Whoa(nil):load(
  { id = "example_id" }, nil
)
```

### PHP

```php
<?php
require_once 'keanuwhoa_sdk.php';

$client = new KeanuWhoaSDK([
    "apikey" => getenv("KEANU-WHOA_APIKEY"),
]);

// List all whoas
[$whoas, $err] = $client->Whoa(null)->list(null, null);

// Load a specific whoa
[$whoa, $err] = $client->Whoa(null)->load(
    ["id" => "example_id"], null
);
```

### Python

```python
import os
from keanuwhoa_sdk import KeanuWhoaSDK

client = KeanuWhoaSDK({
    "apikey": os.environ.get("KEANU-WHOA_APIKEY"),
})

# List all whoas
whoas, err = client.Whoa(None).list(None, None)

# Load a specific whoa
whoa, err = client.Whoa(None).load(
    {"id": "example_id"}, None
)
```

### Ruby

```ruby
require_relative "KeanuWhoa_sdk"

client = KeanuWhoaSDK.new({
  "apikey" => ENV["KEANU-WHOA_APIKEY"],
})

# List all whoas
whoas, err = client.Whoa(nil).list(nil, nil)

# Load a specific whoa
whoa, err = client.Whoa(nil).load(
  { "id" => "example_id" }, nil
)
```

### TypeScript

```ts
import { KeanuWhoaSDK } from 'keanu-whoa'

const client = new KeanuWhoaSDK({
  apikey: process.env.KEANU-WHOA_APIKEY,
})

// List all whoas
const whoas = await client.Whoa().list()
```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Whoa(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Whoa(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = KeanuWhoaSDK::test(null, null);
[$result, $err] = $client->Whoa(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = KeanuWhoaSDK.test(None, None)
result, err = client.Whoa(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = KeanuWhoaSDK.test(nil, nil)
result, err = client.Whoa(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = KeanuWhoaSDK.test()
const result = await client.Whoa().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Go CLI SDK](go-cli/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

