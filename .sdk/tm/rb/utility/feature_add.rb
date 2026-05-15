# KeanuWhoa SDK utility: feature_add
module KeanuWhoaUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
