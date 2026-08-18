-- KeanuWhoa SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "KeanuWhoa",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "360p",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "480p",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "720p",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "audio",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "character",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "current_whoa_in_movie",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "director",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "full_line",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "movie",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "movie_duration",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "poster",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "timestamp",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "total_whoas_in_movie",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "video",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "whoa_in_movie",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "year",
            ["type"] = "`$INTEGER`",
          },
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
                ["parts"] = {
                  "whoas",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
                ["parts"] = {
                  "whoas",
                  "{id}",
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
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/whoas/random",
                ["parts"] = {
                  "whoas",
                  "random",
                },
                ["select"] = {
                  ["$action"] = "random",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.video`",
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
