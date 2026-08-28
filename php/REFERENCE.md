# KeanuWhoa PHP SDK Reference

Complete API reference for the KeanuWhoa PHP SDK.


## KeanuWhoaSDK

### Constructor

```php
require_once __DIR__ . '/keanuwhoa_sdk.php';

$client = new KeanuWhoaSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `KeanuWhoaSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = KeanuWhoaSDK::test();
```


### Instance Methods

#### `Whoa($data = null)`

Create a new `WhoaEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): KeanuWhoaUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## WhoaEntity

```php
$whoa = $client->Whoa();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `1080p` | `string` | No | URL to 1080p video clip |
| `360p` | `string` | No | URL to 360p video clip |
| `480p` | `string` | No | URL to 480p video clip |
| `720p` | `string` | No | URL to 720p video clip |
| `audio` | `string` | No | URL to audio clip of the whoa |
| `character` | `string` | No | Character name that Keanu Reeves played |
| `current_whoa_in_movie` | `int` | No | The number of this whoa within the movie |
| `director` | `string` | No | Director of the movie |
| `full_line` | `string` | No | The full line of dialogue containing the whoa |
| `id` | `int` | No | Unique identifier for the whoa instance |
| `movie` | `string` | No | Title of the movie where the whoa was said |
| `movie_duration` | `string` | No | Total duration of the movie |
| `poster` | `string` | No | URL to movie poster image |
| `timestamp` | `string` | No | Timestamp when the whoa occurs in the movie |
| `total_whoas_in_movie` | `int` | No | Total number of whoas in the movie |
| `video` | `array` | No |  |
| `whoa_in_movie` | `string` | No | Representation of whoa count in the movie (e.g., '1 of 5') |
| `year` | `int` | No | Year the movie was released |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Whoa()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Whoa()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WhoaEntity`

Create a new `WhoaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new KeanuWhoaSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

