# KeanuWhoa SDK utility: make_context
require_relative '../core/context'
module KeanuWhoaUtilities
  MakeContext = ->(ctxmap, basectx) {
    KeanuWhoaContext.new(ctxmap, basectx)
  }
end
