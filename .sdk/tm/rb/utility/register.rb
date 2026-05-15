# KeanuWhoa SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

KeanuWhoaUtility.registrar = ->(u) {
  u.clean = KeanuWhoaUtilities::Clean
  u.done = KeanuWhoaUtilities::Done
  u.make_error = KeanuWhoaUtilities::MakeError
  u.feature_add = KeanuWhoaUtilities::FeatureAdd
  u.feature_hook = KeanuWhoaUtilities::FeatureHook
  u.feature_init = KeanuWhoaUtilities::FeatureInit
  u.fetcher = KeanuWhoaUtilities::Fetcher
  u.make_fetch_def = KeanuWhoaUtilities::MakeFetchDef
  u.make_context = KeanuWhoaUtilities::MakeContext
  u.make_options = KeanuWhoaUtilities::MakeOptions
  u.make_request = KeanuWhoaUtilities::MakeRequest
  u.make_response = KeanuWhoaUtilities::MakeResponse
  u.make_result = KeanuWhoaUtilities::MakeResult
  u.make_point = KeanuWhoaUtilities::MakePoint
  u.make_spec = KeanuWhoaUtilities::MakeSpec
  u.make_url = KeanuWhoaUtilities::MakeUrl
  u.param = KeanuWhoaUtilities::Param
  u.prepare_auth = KeanuWhoaUtilities::PrepareAuth
  u.prepare_body = KeanuWhoaUtilities::PrepareBody
  u.prepare_headers = KeanuWhoaUtilities::PrepareHeaders
  u.prepare_method = KeanuWhoaUtilities::PrepareMethod
  u.prepare_params = KeanuWhoaUtilities::PrepareParams
  u.prepare_path = KeanuWhoaUtilities::PreparePath
  u.prepare_query = KeanuWhoaUtilities::PrepareQuery
  u.result_basic = KeanuWhoaUtilities::ResultBasic
  u.result_body = KeanuWhoaUtilities::ResultBody
  u.result_headers = KeanuWhoaUtilities::ResultHeaders
  u.transform_request = KeanuWhoaUtilities::TransformRequest
  u.transform_response = KeanuWhoaUtilities::TransformResponse
}
