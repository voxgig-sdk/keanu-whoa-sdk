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
            "type": "`$STRING`",
          },
          {
            "name": "360p",
            "type": "`$STRING`",
          },
          {
            "name": "480p",
            "type": "`$STRING`",
          },
          {
            "name": "720p",
            "type": "`$STRING`",
          },
          {
            "name": "audio",
            "type": "`$STRING`",
          },
          {
            "name": "character",
            "type": "`$STRING`",
          },
          {
            "name": "current_whoa_in_movie",
            "type": "`$INTEGER`",
          },
          {
            "name": "director",
            "type": "`$STRING`",
          },
          {
            "name": "full_line",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "movie",
            "type": "`$STRING`",
          },
          {
            "name": "movie_duration",
            "type": "`$STRING`",
          },
          {
            "name": "poster",
            "type": "`$STRING`",
          },
          {
            "name": "timestamp",
            "type": "`$STRING`",
          },
          {
            "name": "total_whoas_in_movie",
            "type": "`$INTEGER`",
          },
          {
            "name": "video",
            "type": "`$OBJECT`",
          },
          {
            "name": "whoa_in_movie",
            "type": "`$STRING`",
          },
          {
            "name": "year",
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
