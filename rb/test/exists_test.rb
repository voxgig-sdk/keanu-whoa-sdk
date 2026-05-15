# KeanuWhoa SDK exists test

require "minitest/autorun"
require_relative "../KeanuWhoa_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = KeanuWhoaSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
