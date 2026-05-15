-- KeanuWhoa SDK error

local KeanuWhoaError = {}
KeanuWhoaError.__index = KeanuWhoaError


function KeanuWhoaError.new(code, msg, ctx)
  local self = setmetatable({}, KeanuWhoaError)
  self.is_sdk_error = true
  self.sdk = "KeanuWhoa"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function KeanuWhoaError:error()
  return self.msg
end


function KeanuWhoaError:__tostring()
  return self.msg
end


return KeanuWhoaError
