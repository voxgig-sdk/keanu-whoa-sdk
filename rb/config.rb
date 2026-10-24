# KeanuWhoa SDK configuration

module KeanuWhoaConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "KeanuWhoa",
        "slug" => "keanu-whoa",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://whoa.onrender.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "whoa" => {},
        },
      },
      "entity" => {
        "whoa" => {
          "fields" => [
            {
              "name" => "audio",
              "title" => "Audio",
              "type" => "`$STRING`",
              "short" => "URL to audio clip of the whoa",
            },
            {
              "name" => "character",
              "title" => "Character",
              "type" => "`$STRING`",
              "short" => "Character name that Keanu Reeves played",
            },
            {
              "name" => "current_whoa_in_movie",
              "title" => "Current Whoa In Movie",
              "type" => "`$INTEGER`",
              "short" => "The number of this whoa within the movie",
            },
            {
              "name" => "director",
              "title" => "Director",
              "type" => "`$STRING`",
              "short" => "Director of the movie",
            },
            {
              "name" => "full_line",
              "title" => "Full Line",
              "type" => "`$STRING`",
              "short" => "The full line of dialogue containing the whoa",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Unique identifier for the whoa instance",
            },
            {
              "name" => "movie",
              "title" => "Movie",
              "type" => "`$STRING`",
              "short" => "Title of the movie where the whoa was said",
            },
            {
              "name" => "movie_duration",
              "title" => "Movie Duration",
              "type" => "`$STRING`",
              "short" => "Total duration of the movie",
            },
            {
              "name" => "poster",
              "title" => "Poster",
              "type" => "`$STRING`",
              "short" => "URL to movie poster image",
            },
            {
              "name" => "timestamp",
              "title" => "Timestamp",
              "type" => "`$STRING`",
              "short" => "Timestamp when the whoa occurs in the movie",
            },
            {
              "name" => "total_whoas_in_movie",
              "title" => "Total Whoas In Movie",
              "type" => "`$INTEGER`",
              "short" => "Total number of whoas in the movie",
            },
            {
              "name" => "video",
              "title" => "Video",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "whoa_in_movie",
              "title" => "Whoa In Movie",
              "type" => "`$STRING`",
              "short" => "Representation of whoa count in the movie (e.g., '1 of 5')",
            },
            {
              "name" => "year",
              "title" => "Year",
              "type" => "`$INTEGER`",
              "short" => "Year the movie was released",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "whoa",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/whoas",
                  "segments" => [
                    {
                      "lit" => "whoas",
                    },
                  ],
                  "parts" => [
                    "whoas",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/whoas/{id}",
                  "segments" => [
                    {
                      "lit" => "whoas",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "whoas",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/whoas/random",
                  "segments" => [
                    {
                      "lit" => "whoas",
                    },
                    {
                      "lit" => "random",
                    },
                  ],
                  "parts" => [
                    "whoas",
                    "random",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {
                    "$action" => "random",
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    KeanuWhoaFeatures.make_feature(name)
  end
end
