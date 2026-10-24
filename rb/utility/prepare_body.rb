# KeanuWhoa SDK utility: prepare_body
require_relative 'media'
module KeanuWhoaUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return KeanuWhoaUtilities.raw_body(ctx.reqdata) if KeanuWhoaUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
