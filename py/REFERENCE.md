# KeanuWhoa Python SDK Reference

Complete API reference for the KeanuWhoa Python SDK.


## KeanuWhoaSDK

### Constructor

```python
from keanuwhoa_sdk import KeanuWhoaSDK

client = KeanuWhoaSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `KeanuWhoaSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = KeanuWhoaSDK.test()
```


### Instance Methods

#### `Whoa(data=None)`

Create a new `WhoaEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## WhoaEntity

```python
whoa = client.Whoa()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `1080p` | `str` | No | URL to 1080p video clip |
| `360p` | `str` | No | URL to 360p video clip |
| `480p` | `str` | No | URL to 480p video clip |
| `720p` | `str` | No | URL to 720p video clip |
| `audio` | `str` | No | URL to audio clip of the whoa |
| `character` | `str` | No | Character name that Keanu Reeves played |
| `current_whoa_in_movie` | `int` | No | The number of this whoa within the movie |
| `director` | `str` | No | Director of the movie |
| `full_line` | `str` | No | The full line of dialogue containing the whoa |
| `id` | `int` | No | Unique identifier for the whoa instance |
| `movie` | `str` | No | Title of the movie where the whoa was said |
| `movie_duration` | `str` | No | Total duration of the movie |
| `poster` | `str` | No | URL to movie poster image |
| `timestamp` | `str` | No | Timestamp when the whoa occurs in the movie |
| `total_whoas_in_movie` | `int` | No | Total number of whoas in the movie |
| `video` | `dict` | No |  |
| `whoa_in_movie` | `str` | No | Representation of whoa count in the movie (e.g., '1 of 5') |
| `year` | `int` | No | Year the movie was released |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Whoa().list()
for whoa in results:
    print(whoa)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Whoa().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WhoaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = KeanuWhoaSDK({
    "feature": {
        "test": {"active": True},
    },
})
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

