-- KeanuWhoa SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "KeanuWhoa",
      slug = "keanu-whoa",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://whoa.onrender.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["whoa"] = {},
      },
    },
    entity = {
      ["whoa"] = {
        ["fields"] = {
          {
            ["name"] = "1080p",
            ["short"] = "URL to 1080p video clip",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "360p",
            ["short"] = "URL to 360p video clip",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "480p",
            ["short"] = "URL to 480p video clip",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "720p",
            ["short"] = "URL to 720p video clip",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "audio",
            ["short"] = "URL to audio clip of the whoa",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "character",
            ["short"] = "Character name that Keanu Reeves played",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "current_whoa_in_movie",
            ["short"] = "The number of this whoa within the movie",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "director",
            ["short"] = "Director of the movie",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "full_line",
            ["short"] = "The full line of dialogue containing the whoa",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["short"] = "Unique identifier for the whoa instance",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "movie",
            ["short"] = "Title of the movie where the whoa was said",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "movie_duration",
            ["short"] = "Total duration of the movie",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "poster",
            ["short"] = "URL to movie poster image",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "timestamp",
            ["short"] = "Timestamp when the whoa occurs in the movie",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "total_whoas_in_movie",
            ["short"] = "Total number of whoas in the movie",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "video",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "whoa_in_movie",
            ["short"] = "Representation of whoa count in the movie (e.g., '1 of 5')",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "year",
            ["short"] = "Year the movie was released",
            ["type"] = "`$INTEGER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "whoa",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/whoas",
                ["segments"] = {
                  {
                    ["lit"] = "whoas",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "whoas",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/whoas/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "whoas",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.video`",
                },
                ["parts"] = {
                  "whoas",
                  "{id}",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/whoas/random",
                ["segments"] = {
                  {
                    ["lit"] = "whoas",
                  },
                  {
                    ["lit"] = "random",
                  },
                },
                ["select"] = {
                  ["$action"] = "random",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.video`",
                },
                ["parts"] = {
                  "whoas",
                  "random",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
