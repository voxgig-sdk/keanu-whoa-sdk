# KeanuWhoa SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
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
            "name": "1080p",
            "short": "URL to 1080p video clip",
            "type": "`$STRING`",
          },
          {
            "name": "360p",
            "short": "URL to 360p video clip",
            "type": "`$STRING`",
          },
          {
            "name": "480p",
            "short": "URL to 480p video clip",
            "type": "`$STRING`",
          },
          {
            "name": "720p",
            "short": "URL to 720p video clip",
            "type": "`$STRING`",
          },
          {
            "name": "audio",
            "short": "URL to audio clip of the whoa",
            "type": "`$STRING`",
          },
          {
            "name": "character",
            "short": "Character name that Keanu Reeves played",
            "type": "`$STRING`",
          },
          {
            "name": "current_whoa_in_movie",
            "short": "The number of this whoa within the movie",
            "type": "`$INTEGER`",
          },
          {
            "name": "director",
            "short": "Director of the movie",
            "type": "`$STRING`",
          },
          {
            "name": "full_line",
            "short": "The full line of dialogue containing the whoa",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the whoa instance",
            "type": "`$INTEGER`",
          },
          {
            "name": "movie",
            "short": "Title of the movie where the whoa was said",
            "type": "`$STRING`",
          },
          {
            "name": "movie_duration",
            "short": "Total duration of the movie",
            "type": "`$STRING`",
          },
          {
            "name": "poster",
            "short": "URL to movie poster image",
            "type": "`$STRING`",
          },
          {
            "name": "timestamp",
            "short": "Timestamp when the whoa occurs in the movie",
            "type": "`$STRING`",
          },
          {
            "name": "total_whoas_in_movie",
            "short": "Total number of whoas in the movie",
            "type": "`$INTEGER`",
          },
          {
            "name": "video",
            "type": "`$OBJECT`",
          },
          {
            "name": "whoa_in_movie",
            "short": "Representation of whoa count in the movie (e.g., '1 of 5')",
            "type": "`$STRING`",
          },
          {
            "name": "year",
            "short": "Year the movie was released",
            "type": "`$INTEGER`",
          },
        ],
        "name": "whoa",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/whoas",
                "parts": [
                  "whoas",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/whoas/{id}",
                "parts": [
                  "whoas",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.video`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/whoas/random",
                "parts": [
                  "whoas",
                  "random",
                ],
                "select": {
                  "$action": "random",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.video`",
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
