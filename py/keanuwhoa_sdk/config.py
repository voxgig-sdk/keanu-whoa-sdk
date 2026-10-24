# KeanuWhoa SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "KeanuWhoa",
            "slug": "keanu-whoa",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://whoa.onrender.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "whoa": {},
            },
        },
        "entity": {
      "whoa": {
        "fields": [
          {
            "name": "audio",
            "title": "Audio",
            "type": "`$STRING`",
            "short": "URL to audio clip of the whoa",
          },
          {
            "name": "character",
            "title": "Character",
            "type": "`$STRING`",
            "short": "Character name that Keanu Reeves played",
          },
          {
            "name": "current_whoa_in_movie",
            "title": "Current Whoa In Movie",
            "type": "`$INTEGER`",
            "short": "The number of this whoa within the movie",
          },
          {
            "name": "director",
            "title": "Director",
            "type": "`$STRING`",
            "short": "Director of the movie",
          },
          {
            "name": "full_line",
            "title": "Full Line",
            "type": "`$STRING`",
            "short": "The full line of dialogue containing the whoa",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "Unique identifier for the whoa instance",
          },
          {
            "name": "movie",
            "title": "Movie",
            "type": "`$STRING`",
            "short": "Title of the movie where the whoa was said",
          },
          {
            "name": "movie_duration",
            "title": "Movie Duration",
            "type": "`$STRING`",
            "short": "Total duration of the movie",
          },
          {
            "name": "poster",
            "title": "Poster",
            "type": "`$STRING`",
            "short": "URL to movie poster image",
          },
          {
            "name": "timestamp",
            "title": "Timestamp",
            "type": "`$STRING`",
            "short": "Timestamp when the whoa occurs in the movie",
          },
          {
            "name": "total_whoas_in_movie",
            "title": "Total Whoas In Movie",
            "type": "`$INTEGER`",
            "short": "Total number of whoas in the movie",
          },
          {
            "name": "video",
            "title": "Video",
            "type": "`$OBJECT`",
          },
          {
            "name": "whoa_in_movie",
            "title": "Whoa In Movie",
            "type": "`$STRING`",
            "short": "Representation of whoa count in the movie (e.g., '1 of 5')",
          },
          {
            "name": "year",
            "title": "Year",
            "type": "`$INTEGER`",
            "short": "Year the movie was released",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "whoa",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/whoas",
                "segments": [
                  {
                    "lit": "whoas",
                  },
                ],
                "parts": [
                  "whoas",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/whoas/{id}",
                "segments": [
                  {
                    "lit": "whoas",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "whoas",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/whoas/random",
                "segments": [
                  {
                    "lit": "whoas",
                  },
                  {
                    "lit": "random",
                  },
                ],
                "parts": [
                  "whoas",
                  "random",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "random",
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
