-- ProjectName SDK exists test

local sdk = require("keanu-whoa_sdk")

describe("KeanuWhoaSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
