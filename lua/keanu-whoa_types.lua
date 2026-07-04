-- Typed models for the KeanuWhoa SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Whoa
---@field audio? string
---@field character? string
---@field current_whoa_in_movie? number
---@field director? string
---@field full_line? string
---@field id? number
---@field movie? string
---@field movie_duration? string
---@field poster? string
---@field timestamp? string
---@field total_whoas_in_movie? number
---@field video? table
---@field whoa_in_movie? string
---@field year? number

---@class WhoaLoadMatch
---@field id number

---@class WhoaListMatch

local M = {}

return M
