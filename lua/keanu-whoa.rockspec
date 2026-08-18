package = "voxgig-sdk-keanu-whoa"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/keanu-whoa-sdk.git",
  tag = "lua/v0.0.1",
  dir = "keanu-whoa-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the Keanu Whoa public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/keanu-whoa-sdk",
  issues_url = "https://github.com/voxgig-sdk/keanu-whoa-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "keanu-whoa" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["keanu-whoa_sdk"] = "keanu-whoa_sdk.lua",
    ["config"] = "config.lua",
    ["config_shared"] = "config_shared.lua",
    ["features"] = "features.lua",
  }
}
