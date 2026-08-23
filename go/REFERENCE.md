# KeanuWhoa Golang SDK Reference

Complete API reference for the KeanuWhoa Golang SDK.


## KeanuWhoaSDK

### Constructor

```go
func NewKeanuWhoaSDK(options map[string]any) *KeanuWhoaSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *KeanuWhoaSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *KeanuWhoaSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Whoa(data map[string]any) KeanuWhoaEntity`

Create a new `Whoa` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## WhoaEntity

```go
whoa := client.Whoa(nil)
fmt.Println(whoa.GetName()) // "whoa"
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
| `video` | `map[string]any` | No |  |
| `whoa_in_movie` | `string` | No | Representation of whoa count in the movie (e.g., '1 of 5') |
| `year` | `int` | No | Year the movie was released |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Whoa(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Whoa(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WhoaEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewKeanuWhoaSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

