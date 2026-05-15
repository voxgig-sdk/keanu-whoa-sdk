# KeanuWhoa SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module KeanuWhoaFeatures
  def self.make_feature(name)
    case name
    when "base"
      KeanuWhoaBaseFeature.new
    when "test"
      KeanuWhoaTestFeature.new
    else
      KeanuWhoaBaseFeature.new
    end
  end
end
