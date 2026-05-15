package = "voxgig-sdk-keanu-whoa"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/keanu-whoa-sdk.git"
}
description = {
  summary = "KeanuWhoa SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["keanu-whoa_sdk"] = "keanu-whoa_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
