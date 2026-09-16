# KeanuWhoa SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module KeanuWhoaFeatures
  def self.make_feature(name)
    case name
    when "base"
      KeanuWhoaBaseFeature.new
    when "ratelimit"
      KeanuWhoaRatelimitFeature.new
    when "retry"
      KeanuWhoaRetryFeature.new
    when "test"
      KeanuWhoaTestFeature.new
    when "timeout"
      KeanuWhoaTimeoutFeature.new
    else
      KeanuWhoaBaseFeature.new
    end
  end
end
